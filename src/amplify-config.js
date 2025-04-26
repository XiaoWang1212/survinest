import { Amplify } from 'aws-amplify';

try {
  const amplifyconfig = {
    "aws_project_region": "us-west-2",
    "Auth": {
      "region": "us-west-2",
      "userPoolId": "us-west-2_adUgt5d9m",
      "userPoolWebClientId": "35e3m2vlp4ijca2agas9ekula0",
      "identityPoolId": "us-west-2:cd7301c7-7170-4460-a40b-ec51a74e75c4",
      "mandatorySignIn": false,
      "authenticationFlowType": "USER_SRP_AUTH"
    }
  };
  
  // 配置 Amplify
  Amplify.configure(amplifyconfig);
  console.log('Amplify 配置成功載入');
} catch (error) {
  console.error('Amplify 配置載入失敗:', error);
}

export default Amplify;