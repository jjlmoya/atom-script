const LinkedinData = data => {
    return {
        url: data.link,
        mini: true,
        title: data.title,
        summary: data.text,
        source: data.link
    };
};

const LinkedinUrl = (params, redirect) => {
    return redirect('https://www.linkedin.com/shareArticle?', params);
};

export {LinkedinData, LinkedinUrl};