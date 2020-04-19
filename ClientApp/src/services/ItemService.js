export default class ItemService {

	static async addItem(newItem) {
        let data;
        try {
			const response = await fetch('api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newItem)
            });
			data = await response.json();
			if(data.status && data.status !== 200)
				throw new Error(data.title || "");
        }
        catch (error) {
			throw new Error(error);
		}
		return data;
	}

	static async deleteItem(itemId) {
        let data;
        try {
			const response = await fetch('api/items/'+itemId, {
                method: 'DELETE'
            });
			data = await response.json();
			if(data.status && data.status !== 200)
				throw new Error(data.title || "");
        }
        catch (error) {
			throw new Error(error);
		}
		return data;
	}

}