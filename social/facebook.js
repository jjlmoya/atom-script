const FacebookData = data => {
    return {
        u: data.link,
        quote: data.text,
        hashtags: data.hashtags
    };
};

const FacebookUrl = (params, redirect) => {
    return redirect('https://www.facebook.com/sharer/sharer.php?', params);
};

export  {FacebookData, FacebookUrl};