const WhatsappData = data => {
    return {
        text: data.link
    };
};

let WhatsappUrl = (params, redirect) => {
    return redirect('whatsapp://send?', params);
};

export let Whatsapp = {
    data: WhatsappData,
    url: WhatsappUrl
};