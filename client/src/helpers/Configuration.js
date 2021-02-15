export const tenantId = (() =>
	window.location.hostname.toLowerCase().includes("or.") ||
	window.location.hostname.toLowerCase().includes("oregon.") ||
	window.location.hostname.toLowerCase().includes("pdx.") ||
	window.location.hostname.toLowerCase().includes("portland.") ||
	process.env.REACT_APP_TENANT_ID === "4"
		? 4
		: window.location.hostname.toLowerCase().includes("hi.") ||
		  window.location.hostname.toLowerCase().includes("hawaii") ||
		  process.env.REACT_APP_TENANT_ID === "3"
		? 3
		: window.location.hostname.toLowerCase().includes("ca.") ||
		  window.location.hostname.toLowerCase().includes("california") ||
		  process.env.REACT_APP_TENANT_ID === "2"
		? 2
		: 1)();

export const originCoordinates = (() => {
	switch (tenantId) {
		case 4:
			return { lat: 45.52445, lon: -122.65066, zoom: 12, radius: 5 };
		case 3:
			return { lat: 21.3101548, lon: -157.8428712, zoom: 12, radius: 5 };
		case 2:
			return { lat: 38.3949164, lon: -122.7287326, zoom: 10, radius: 8 };
		default:
			return { lat: 34.0354899, lon: -118.2439235, zoom: 12, radius: 5 };
	}
})();
