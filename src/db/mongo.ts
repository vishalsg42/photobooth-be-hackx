
// const mongoose = require('mongoose');
import mongoose from 'mongoose';
import { BaseException } from '../exceptions';

const db = mongoose.connection;

export const findOne = (collection: string, query: any, projection: any) => new Promise(async (resolve, reject) => {
	try {
		if (!db) {
			throw new BaseException('Mongo Connection Exception occured');
		}
		const data = await db.collection(collection).findOne(query, projection);
		resolve(data);
	} catch (error) {
		reject(error);
	}
});

export const insertOne = (collection: string, data: any) => new Promise(async (resolve, reject) => {
	try {
		if (!db) {
			throw new BaseException('Mongo Connection Exception occured');
		}
		const result = await db.collection(collection).insertOne(data);
		resolve(result);
	} catch (error) {
		reject(error);
	}
});

export const deleteOne = (collection: string, data: any) => new Promise(async (resolve, reject) => {
	try {
		if (!db) {
			throw new BaseException('Mongo Connection Exception occured');
		}
		const result = await db.collection(collection).deleteOne(data);
		resolve(result);
	} catch (error) {
		reject(error);
	}
});