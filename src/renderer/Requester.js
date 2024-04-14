export class Requester{

    static backendPort = ""

    static postUserInfo(userCode) {
        return {name: "User"}
    }
    
    // static async postUserInfo(userCode) {
    //     try {
    //         const response = await fetch(Requester.backendPort + 'api/get_user_info', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 userCode: userCode,
    //             })
    //         });
    //         if (response.ok) {
    //             return response.json();
    //         }else {
    //             // If the status code is 4xx or 5xx, parse the JSON error response
    //             const errorResponse = await response.json();
    //             // Throws an Error object containing error information
    //             // console.error("errorResponse ", errorResponse)
    //             const error = new Error(errorResponse.detail.message || 'Request failed');
    //             console.error(error, errorResponse)
    //         }
    //     } catch (error) {
    //         throw error;
    //     }
    // }
}