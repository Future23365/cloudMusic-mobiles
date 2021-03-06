import server from "./request";
import axios from "axios";

//获取歌曲url
export const getsongUrl = id => {
  return server({
    url: `/song/url?id=${id}`
  });
};
//检查音乐是否可用
export const checkMusic = id => {
  return server({
    url: `/check/music?id=${id}`
  });
};
//获取歌曲详细信息
export const getsongDetail = ids => {
  return server({
    url: `/song/detail?ids=${ids}`
  });
};
//获取新歌
export const getsongNew = () => {
  return server({
    url: `/personalized/newsong`
  });
};

//获取歌曲排行榜
export const getsongTop = id => {
  return server({
    url: `/top/list?id=${id}`
  });
};
//获取歌词
export const getsongLyric = id => {
  return server({
    url: `/lyric?id=${id}`
  });
};
//获取评论
export const getsongComment = (target, id, limit = 20, offset = 0) => {
  return server({
    url: `/comment/${target}?id=${id}&limit=${limit}&offset=${offset}`
  });
};

//获取搜索建议
export const getsearchSuggest = (keywords, type = '') => {
  if(type === '') {
    return server({
      url: `/search/suggest?keywords=${keywords}`
    });
  }else {
    return server({
      url: `/search/suggest?keywords=${keywords}&type=${type}`
    })
  }
  
};
//获取搜索结果
export const getsearchResult = (keywords, limit = 30, offset = 0, type = 1) => {
  return server({
    url: `/search?keywords=${keywords}&limit=${limit}&offset=${offset}&type=${type}`
  });
};

//获取mv数据
export const getMvdata = id => {
  return server({
    url: `/mv/detail?mvid=${id}`
  });
};
//获取mv播放地址
export const getMvurl = id => {
  return server({
    url: `/mv/url?id=${id}`
  });
};
//获取mv评论
export const getMvcomments = (id, limit, offset = 0) => {
  return server({
    url: `/comment/mv?id=${id}&limit=${limit}&offset=${offset}`
  });
};

//获取歌手描述
export const getArtistdesc = id => {
  return server({
    url: `/artist/desc?id=${id}`
  });
};
//获取歌手热门单曲
export const getArtistsongs = id => {
  return server({
    url: `/artists?id=${id}`
  });
};
//获取歌手专辑
export const getArtistalbum = (id, limit = 30, offset = 0) => {
  return server({
    url: `/artist/album?id=${id}&limit=${limit}&offst=${offset}`
  });
};
//获取歌手mv
export const getArtistmv = (id, limit = 30) => {
  return server({
    url: `/artist/mv?id=${id}&limit=${limit}`
  });
};

//获取专辑动态信息
export const getAlbumdata = id => {
  return server({
    url: `/album/detail/dynamic?id=${id}`
  });
};
//获取专辑内容
export const getAlbum = id => {
  return server({
    url: `/album?id=${id}`
  });
};

//获取用户详情
export const getUserData = id => {
  return server({
    url: `/user/detail?uid=${id}`
  });
};

//获取用户歌单
export const getUserplaylist = (id, limit = 29) => {
  return server({
    url: `/user/playlist?uid=${id}&limit=${limit}`
  });
};

//获取歌单详情
export const getUserPlaylistDetail = id => {
  return server({
    url: `/playlist/detail?id=${id}`
  });
};
//获取用户播放记录
export const getUserRecord = (id, type) => {
  return server({
    url: `/user/record?uid=${id}&type=${type}`
  });
};

//获取video数据
export const getVideodata = id => {
  return server({
    url: `/video/detail?id=${id}`
  });
};
//获取video播放地址
export const getVideourl = id => {
  return server({
    url: `/video/url?id=${id}`
  });
};
//获取video评论
export const getVideocomments = (id, limit, offset = 0) => {
  return server({
    url: `/comment/video?id=${id}&limit=${limit}&offset=${offset}`
  });
};
//获取banner数据
export const getBanner = (type = 1) => {
  return server({
    url: `/banner?type=${type}`
  });
};

//获取精品歌单
export const getHighquality = (limit = 20) => {
  return server({
    url: `/top/playlist/highquality?limit=${limit}`
  });
};
//获取新专辑
export const getNewwest = () => {
  return server({
    url: `/album/newest`
  });
};

//获取视频标签
export const getVideogroup = () => {
  return server({
    url: `/video/group/list`
  });
};

//获取推荐mv
export const getPersonalizedMv = () => {
  return server({
    url: `/personalized/mv`
  });
};
//获取云村热评
export const getHotwall = () => {
  return server(({
    url: `/comment/hotwall/list`
  }));
};

//获取全部MV
export const getAllmv = (area = '全部', type = '全部', order = '上升最快', limit = 30, offset = 0) => {
  return server({
    url: `/mv/all?area=${area}&type=${type}&order=${order}&limit=${limit}&offset=${offset}`
  })
}

//获取歌单分类
export const getCatlist = () => {
  return server({
    url: `/playlist/catlist`
  })
}
//获取歌单
export const getPlaylist = (cat = '全部', limit = 30, offset = 0) => {
  return server({
    url: `/top/playlist?cat=${cat}&limit=${limit}&offset=${offset}`
  })
}

//获取排行榜
export const getToplist = () => {
  return server({
    url: `/toplist`
  })
}

//获取歌曲批量详情
export const getSongDetailall = (arr) => {
  return server({
    url: `/song/detail?ids=${arr.join(',')}`
  })
}

//获取热搜列表
export const getSearchDetail = () => {
  return server({
    url: `/search/hot/detail`
  })
}

//获取用户喜欢的音乐 
export const getlikeLise = (id) => {
  return server({
    url: `/likelist?uid=${id}`
  })
}

//并发请求
export const serverAll = arr => {
  return axios.all(arr);
};

export const getMp3 = url1 => {
  return axios.create({
    method: 'get',
    url: url1,
    timeout: 5000,
    responseType: 'blob'
  });
};
