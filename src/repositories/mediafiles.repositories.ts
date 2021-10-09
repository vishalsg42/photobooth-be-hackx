import mysql from '../db/mysql';

class MediaFilesRepositories {
    fetchEventCode(eventCode: string): Promise<any> {
        return new Promise(async (reject, resolve) => {
            try {
                const query = `SELECT count(ve.event_code) AS count FROM virtual_events  ve WHERE ve.is_active = 1 AND ve.event_code = ?`
                const data = await mysql.execute(query, [eventCode]);
                if (data.length > 0) {
                    return resolve(data[0].count);
                }
            } catch (error) {
                reject(error);
            }
        })
    }
}

export default MediaFilesRepositories;
