const fetchData = async (url) => {
	const response = await fetch(url)

	if (response.ok) {
		const jsonData = await response.json();
		return jsonData
	}
	else {
		throw new Error("Could not fetch the data for that resource")
	}
};

export default fetchData;