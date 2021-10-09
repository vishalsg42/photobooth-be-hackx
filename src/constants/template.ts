export const DOCUMENT = {
    UPLOAD_RESPONSE: `{
      "document_id": "{{#? clean($root,'insertId')}}",
      "entity_type": "{{#? clean($root,'entity_type')}}",
      "entity_id": "{{#? clean($root,'entity_id')}}"
    }`
}

export const client_code = {
    some: {
        request: `{
            "loan_code" : "{{#? clean($root,'loan_code')}}",
            "policy" : "{{#? clean($root,'policy')}}",
            "is_active" : "1"
        }`
    }
}

export const MEDIA_FILES_MYSQL_SCHEMA = {
    TABLE_NAME: "media_files",
    QUERY: `{
        "file_name": "{{clean($root, 'orginalFileName')}}",
        "s3_path": "{{clean($root, 's3Path')}}",
        "mime_type": "{{clean($root, 'mimetype')}}"
    }`
}
export const VIRTUAL_EVENT_MEDIA_FILES_MYSQL_SCHEMA = {
    TABLE_NAME: "virtual_event_media_files",
    QUERY: `{
        "event_code": "{{clean($root, 'eventCode')}}",
        "client_code": "{{clean($root, 'clientCode')}}",
        "media_file_id": "{{clean($root, 'mediaFileId')}}",
        "frame_id": "{{clean($root, 'frameId')}}",
        "type": "{{clean($root, 'type')}}"
    }`
}

export const VIRTUAL_EVENT_MEDIA_FILES_RESPONSE_SCHEMA = {
    RESPONSE: `{
        "url": "{{$root.url}}/{{$root.clean(this,'s3Path')}}"
    }`
}

export const FRAMES_MYSQL_SCHEMA = {
    TABLE_NAME: "virtual_events_frames",
    QUERY: `{
        "event_code": "{{clean($root, 'eventCode')}}"
    }`
}

export const API_FRAMES_RESPONSE = `{
    "{{#each items}}": {
      "id": "{{$root.clean(this,'id')}}",
      "name": "{{$root.clean(this,'name')}}",
      "order": "{{$root.clean(this,'order')}}",
      "url": "{{$root.url}}/{{$root.clean(this,'s3_path')}}",
      "mime_type": "{{$root.clean(this,'mime_type')}}"
    }
}`

export const EMAIL_OPTIONS = `{
    "from": "{{$root.clean(this,'senderEmail')}}",
    "to": "{{$root.clean(this,'email')}}",
    "subject": "{{$root.clean(this,'subject')}}",
    "html": "{{$root.clean(this,'body')}}",
    "attachments": "{{$root.clean(this,'attachments')}}"
}`

export const SUBSCRIBED_EMAIL_TEMPLATE_BODY = `Thanks for choosing the splashbooth
    <br>
    <br>
    We are delighted to present you with a photo booth pic. Please find the attachment to preview your photo.
    <br>
    <br>
    Note: if the image is not present or unable to download. Kindly mail us at <a href='mailto:contact@splashbooth.com'>contact@splashbooth.com</a>.
    <br>
    <br>
    <br>
    Regards,
    <br>
    Splashbooth Team
`