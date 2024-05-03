import { Database } from './database.js';
import { buildRoutePath } from './utils/build-route-path.js';
import crypto from 'node:crypto';

const database = new Database();

export const routes = [
	{
		method: 'GET',
		path: buildRoutePath('/contacts'),
		handler(req, res) {
			const { search } = req.query;

			const contacts = database.select(
				'contacts',
				search
					? {
							name: search,
							'contacts.email': search,
							'contacts.phoneNumber': search,
							'contacts.address': search,
					  }
					: null,
			);

			return res.end(JSON.stringify(contacts));
		},
	},
	{
		method: 'POST',
		path: buildRoutePath('/contacts'),
		handler(req, res) {
			const { name, contacts } = req.body;

			const contact = {
				id: crypto.randomUUID(),
				name,
				contacts,
			};

			database.insert('contacts', contact);

			return res.writeHead(201).end();
		},
	},
	{
		method: 'PUT',
		path: buildRoutePath('/contacts/:id'),
		handler(req, res) {
			const { name, contacts } = req.body;
			const { id } = req.params;

			database.update('contacts', id, {
				name,
				contacts,
			});

			return res.writeHead(204).end();
		},
	},
	{
		method: 'DELETE',
		path: buildRoutePath('/contacts/:id'),
		handler(req, res) {
			const { id } = req.params;

			database.delete('contacts', id);

			return res.writeHead(204).end();
		},
	},
];
