import json

def handler(event, context):
    try:
        # 處理 API Gateway 的請求格式
        if 'body' in event and event['body']:
            # 如果請求來自 API Gateway，body 會是字串
            body = json.loads(event['body']) if isinstance(event['body'], str) else event['body']
        else:
            body = event
        
        # 從請求體中獲取參數
        gender = body.get('gender')
        weight = body.get('weight')
        height = body.get('height')
        age = body.get('age')
        activity_level = body.get('activityLevel', 1.2)
        
        if not all([gender, weight, height, age]):
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'  # 允許跨域請求
                },
                'body': json.dumps({
                    'error': '缺少必要參數，請提供性別、體重、身高和年齡'
                }, ensure_ascii=False)
            }
        
        # 檢查參數類型
        try:
            weight_num = float(weight)
            height_num = float(height)
            age_num = float(age)
            activity_level_num = float(activity_level)
        except (ValueError, TypeError):
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'  # 允許跨域請求
                },
                'body': json.dumps({
                    'error': '參數格式錯誤，需要數值型別'
                }, ensure_ascii=False)
            }
        
        # 根據性別計算 BMR
        gender_lower = str(gender).lower()
        
        if gender_lower in ['male', 'm', '男']:
            # BMR(男)=(13.7×體重(公斤))+(5.0×身高(公分))-(6.8×年齡)+66
            bmr = (13.7 * weight_num) + (5.0 * height_num) - (6.8 * age_num) + 66
        elif gender_lower in ['female', 'f', '女']:
            # BMR(女)=(9.6×體重(公斤))+(1.8×身高(公分))-(4.7×年齡)+655
            bmr = (9.6 * weight_num) + (1.8 * height_num) - (4.7 * age_num) + 655
        else:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'  # 允許跨域請求
                },
                'body': json.dumps({
                    'error': '性別參數錯誤，請使用 "男"/"male" 或 "女"/"female"'
                }, ensure_ascii=False)
            }
        
        # 計算 TDEE = BMR x 活動量
        tdee = bmr * activity_level_num
        
        # 回傳結果
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'  # 允許跨域請求
            },
            'body': json.dumps({
                'gender': gender_lower,
                'weight': weight_num,
                'height': height_num,
                'age': age_num,
                'activityLevel': activity_level_num,
                'bmr': round(bmr),
                'tdee': round(tdee)
            }, ensure_ascii=False)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'  # 允許跨域請求
            },
            'body': json.dumps({
                'error': '計算過程中發生錯誤',
                'message': str(e)
            }, ensure_ascii=False)
        }