export default class CalculatorService {

	static async getData() {
        let data;
        try {
			const response = await fetch('api/calculator');
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