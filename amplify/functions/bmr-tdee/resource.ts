import { execSync } from "node:child_process";
import * as path from "node:path";
import * as fs from "node:fs";
import { fileURLToPath } from "node:url";
import { defineFunction } from "@aws-amplify/backend";
import { DockerImage, Duration } from "aws-cdk-lib";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";

const functionDir = path.dirname(fileURLToPath(import.meta.url));

// 跨平台的拷貝目錄函數
function copyDir(src: string , dest: string) {
  // 創建目標目錄
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // 讀取源目錄
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    // 遞歸複製子目錄或複製檔案
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

export const bmrTdeeCalculator = defineFunction(
  (scope) =>
    new Function(scope, "bmr-tdee-calculator", {
      handler: "index.handler",
      runtime: Runtime.PYTHON_3_9,
      timeout: Duration.seconds(10),
      memorySize: 128,
      description: "計算基礎代謝率(BMR)和每日總熱量消耗(TDEE)",
      code: Code.fromAsset(functionDir, {
        bundling: {
          image: DockerImage.fromRegistry("dummy"),
          local: {
            tryBundle(outputDir: string) {
              // 如果有依賴項，使用 requirements.txt 安裝
              try {
                // 使用 pip 安裝依賴，這裡使用適合 Windows 的命令
                const requirementsFile = path.join(functionDir, "requirements.txt");
                if (fs.existsSync(requirementsFile)) {
                  const pipCmd = process.platform === "win32" ? "pip" : "pip3";
                  execSync(
                    `${pipCmd} install -r ${requirementsFile} -t ${outputDir} --platform manylinux2014_x86_64 --only-binary=:all:`
                  );
                }
              } catch (error) {
                console.log("No requirements.txt found or pip install failed, continuing without dependencies");
              }
              
              // 使用 Node.js fs 模組複製函數代碼到輸出目錄
              try {
                // 複製 src 目錄內容
                const srcDir = path.join(functionDir, "src");
                if (fs.existsSync(srcDir)) {
                  // 如果有 src 目錄，將內容複製到輸出目錄
                  copyDir(srcDir, outputDir);
                } else {
                  // 如果沒有 src 目錄，將所有檔案複製到輸出目錄
                  fs.readdirSync(functionDir).forEach(file => {
                    if (file !== "resource.ts" && file !== "node_modules") {
                      const srcPath = path.join(functionDir, file);
                      const destPath = path.join(outputDir, file);
                      
                      if (fs.statSync(srcPath).isDirectory()) {
                        copyDir(srcPath, destPath);
                      } else {
                        fs.copyFileSync(srcPath, destPath);
                      }
                    }
                  });
                }
                console.log(`Successfully copied files to ${outputDir}`);
              } catch (copyError) {
                console.error("Error copying files:", copyError);
                return false;
              }
              
              return true;
            },
          },
        },
      }),
    }),
);