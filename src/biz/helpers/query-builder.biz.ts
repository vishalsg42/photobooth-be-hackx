import  sqlBuilder from 'sql-bricks';
class QueryBuilderBiz {
	table: string;
	builder: any;
	notEq: any;
	constructor(table: string) {
		this.table = table;
		this.builder = sqlBuilder;
		this.notEq = this.builder.notEq;
	}

	select(where: any, params = "*") {
		return new Promise(async (resolve, reject) => {
			try {
				const query = this.builder.select(params).from(this.table).where(where).toString();
				return resolve(query)
			} catch (error) {
				return reject(error);
			}
		});
	}
	insert(params: any) {
		return new Promise(async (resolve, reject) => {
			try {
				const query = this.builder.insert(this.table, params).toString();
				return resolve(query)
			} catch (error) {
				return reject(error);
			}
		});
	}
	update(where : any, params: any, conditions: any = {}) {
		return new Promise(async (resolve, reject) => {
			try {
				const query = this.builder.update(this.table, params).where(where, conditions.notEq ? this.notEq(...conditions.notEq) : {}).toString();
				return resolve(query);
			} catch (error) {
				return reject(error);
			}
		});
	}
}


export default QueryBuilderBiz;