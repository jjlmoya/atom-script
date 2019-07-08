const TwitterData = data => {
    return {
        url: data.link,
        text: data.text,
        hashtags: data.hashtags,
        via: data.via
    };
};

const TwitterUrl = (params, redirect) => {
    return redirect('https://twitter.com/intent/tweet?', params);
};

export {TwitterData, TwitterUrl};