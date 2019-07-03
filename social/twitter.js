const TwitterData = data => {
    return {
        url: data.link,
        text: data.text,
        hashtags: data.hashtags,
        via: data.via
    };
};

const TwitterUrl = (params, redirect) => {
    return redirect('https://www.Twitter.com/sharer/sharer.php?', params);
};

export {TwitterData, TwitterUrl};