#!/bin/bash

timestamp=$(date +%s)
app_source_label=app-${timestamp}
app_source_code=app-${timestamp}.zip
ARTIFACT_S3_BUCKET=photobooth-devops
ARTIFACT_S3_PATH=elasticbeanstalk/${app_source_code}
EB_APPLICATION_NAME=beslin-event
EB_ENVOIRNMENT_NAME=photobooth-app-prod-1
AWS_PROFILE=vishalfl

rm -r dist/*.zip

npm run build

cp package* dist/

cp -r .elasticbeanstalk dist/

cp -r config dist/

cd dist/

zip -rv ${app_source_code} . -x "*.DS_Store" &> ../error.out

aws s3 cp ${app_source_code} s3://${ARTIFACT_S3_BUCKET}/${ARTIFACT_S3_PATH} --profile ${AWS_PROFILE} --region ap-south-1

aws elasticbeanstalk create-application-version --application-name ${EB_APPLICATION_NAME} --version-label ${app_source_label} --source-bundle S3Bucket="${ARTIFACT_S3_BUCKET}",S3Key="${ARTIFACT_S3_PATH}" --profile ${AWS_PROFILE} --region ap-south-1

aws elasticbeanstalk update-environment --application-name ${EB_APPLICATION_NAME} --environment-name ${EB_ENVOIRNMENT_NAME} --version-label ${app_source_label}  --profile ${AWS_PROFILE} --region ap-south-1