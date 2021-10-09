const app = {
    sql: {
        INSERT: {},
        UPDATE: {},
        SELECT: {
            FRAMES_QUERY: `SELECT 
            vef.id, 
            vef.event_code, 
            vef.name, 
            vef.order, 
            mf.mime_type, 
            mf.s3_path 
          FROM 
            virtual_events_frames vef 
            LEFT JOIN media_files mf ON mf.id = vef.media_file_id 
          WHERE 
            vef.event_code = '{eventCode}'
            ORDER BY vef.order
            `
        },
        DELETE: {}
    },
    mongo: {}
};
export default app;