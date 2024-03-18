document.addEventListener('DOMContentLoaded', () => {
    validErrorCodes = [400,422]
    document.body.addEventListener('htmx:beforeSwap', (event) => {
        if(validErrorCodes.includes(event.detail.xhr.status)) {
            event.detail.shouldSwap = true;
            event.detail.isError = false;  
        }
        else if(event.detail.xhr.status >=100 && event.detail.xhr.status < 400) {
            // Do nothing
        }
        else {
            alert("An error occurred. Please try again later.")
        }
    });
});