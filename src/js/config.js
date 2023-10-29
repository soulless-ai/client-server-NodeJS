export const serverHost = "http://84.54.44.148";

export async function sendToServer(header, method, url, requestData, successCallback, errorCallback) {
    try {
      const response = await fetch(serverHost + url, {
        method: method,
        headers: header,
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error('Request failed with status ' + response.status);
      }

      const data = await response.json();
      if (data.success) {
        successCallback(data);
      } else {
        errorCallback(data);
      }
    } catch (error) {
      errorCallback(error);
    }
}
export function showHiddenElement(event, showElement, hideElement) {
    if (event) {
        event.stopPropagation();
    }
    if (showElement) {
        showElement.classList.remove('hidden');
    }
    if (hideElement) {
        hideElement.classList.add('hidden');
    }
}