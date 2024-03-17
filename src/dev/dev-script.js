
const url = "/dev-reload"

window.addEventListener("DOMContentLoaded", () => {
    const mywsServer = new WebSocket("ws://"+window.location.host+url)
    let connected = false
    mywsServer.onopen = (event) => {
        console.log("Connected to the server")
        connected = true
    }
    mywsServer.onclose = (event) => {
       if(connected){
        console.log("Disconnected from the server")
        setInterval(() => {
            const mywsServer1 = new WebSocket("ws://"+window.location.host+url)
            mywsServer1.onopen = (event) => {
                window.location.reload()
            }
        }, 500)
       }
    }
});