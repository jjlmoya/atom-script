const WhatsappData = data => {
    return {
        text: data.link
    };
};

let WhatsappUrl = (params, redirect) => {
    return redirect('whatsapp://send?', params);
};

export  {WhatsappData, WhatsappUrl};