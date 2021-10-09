import QueryRepo from '../../repositories/query.repositories';

class SqlBiz {
  queryRepo: QueryRepo;
  constructor() {
    this.queryRepo = new QueryRepo();
  }
  get(data: any, queries: any) {
    return new Promise(async (resolve, reject) => {
      try {
        var result = {};
        let promises: Array<Promise<any>> = [];
        for (var query of queries) {
          let raw = this.queryRepo.get_sql_data(query, data);
          promises.push(raw);
        }

        promises = await Promise.all(promises);
        for (const promise of promises) {
          result = {
            ...result,
            ...promise
          }
        }

        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  select(data: any, queries: any) {
    return new Promise(async (resolve, reject) => {
      try {
        var result: Array<any> = [];
        for (var query of queries) {
          let raw: any = await this.queryRepo.get_all_data(query, data);
          result = {
            ...result,
            ...raw
          }
        }
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  get_one(data: any, query: any) {
    return new Promise(async (resolve, reject) => {
      try {
        let raw = await this.queryRepo.get_all_data(query, data);
        let result = raw
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  insert(query: any, data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await this.queryRepo.create(query, data);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  update(query: any, data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await this.queryRepo.create(query, data);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  updateAll(queries: any, data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        let promises = [];
        for (var query of queries) {
          let raw = this.queryRepo.create(query, data);
          promises.push(raw);
        }
        let result = await Promise.all(promises);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

}

export default SqlBiz;
