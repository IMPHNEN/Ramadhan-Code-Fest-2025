const fs = require('fs');
const toMs = require("ms");

const nama_path_addlist = './database/list.json'

function addResponList(groupID, key, response, isImage, image_url, _db) {
var obj_add = {
id: groupID,
key: key,
response: response,
isImage: isImage,
image_url: image_url
}
_db.push(obj_add)
fs.writeFileSync(nama_path_addlist, JSON.stringify(_db, null, 3))
}

function getDataResponList(groupID, key, _db) {
let position = null
Object.keys(_db).forEach((x) => {
if (_db[x].id === groupID && _db[x].key === key) {
position = x
}
})
if (position !== null) {
return _db[position]
}
}

function isAlreadyResponList(groupID, key, _db) {
let found = false
Object.keys(_db).forEach((x) => {
if (_db[x].id === groupID && _db[x].key === key) {
found = true
}
})
return found
}

function sendResponList(groupId, key, _dir) {
let position = null
Object.keys(_dir).forEach((x) => {
if (_dir[x].id === groupId && _dir[x].key === key) {
position = x
}
})
if (position !== null) {
return _dir[position].response
}
}

function isAlreadyResponListGroup(groupID, _db) {
let found = false
Object.keys(_db).forEach((x) => {
if (_db[x].id === groupID) {
found = true
}
})
return found
}

function delResponList(groupID, key, _db) {
let position = null
Object.keys(_db).forEach((x) => {
if (_db[x].id === groupID && _db[x].key === key) {
position = x
}
})

if (position !== null) {
_db.splice(position, 1)
fs.writeFileSync(nama_path_addlist, JSON.stringify(_db, null, 3))
}
}

function updateResponList(groupID, key, response, isImage, image_url, _db) {
let position = null
Object.keys(_db).forEach((x) => {
if (_db[x].id === groupID && _db[x].key === key) {
position = x
}
})
if (position !== null) {
_db[position].response = response
_db[position].isImage = isImage
_db[position].image_url = image_url
fs.writeFileSync(nama_path_addlist, JSON.stringify(_db, null, 3))
}
}


function addResponTesti(key, response, isImage, image_url, _db) {
    var obj_add = {
        key: key,
        response: response,
        isImage: isImage,
        image_url: image_url
    }
    _db.push(obj_add)
    fs.writeFileSync('./database/list-testi.json', JSON.stringify(_db, null, 3))
}

function getDataResponTesti(key, _db) {
    let position = null
    Object.keys(_db).forEach((x) => {
        if (_db[x].key === key) {
            position = x
        }
    })
    if (position !== null) {
        return _db[position]
    }
}

function isAlreadyResponTesti(key, _db) {
    let found = false
    Object.keys(_db).forEach((x) => {
        if (_db[x].key === key) {
            found = true
        }
    })
    return found
}

function sendResponTesti(key, _dir) {
    let position = null
    Object.keys(_dir).forEach((x) => {
        if (_dir[x].key === key) {
            position = x
        }
    })
    if (position !== null) {
        return _dir[position].response
    }
}

function resetTestiAll(_db) {
    _db.splice(position, 1)
    fs.writeFileSync('./database/list-testi.json', JSON.stringify(_db, null, 3))
}

function delResponTesti(key, _db) {
    let position = null
    Object.keys(_db).forEach((i) => {
        if (_db[i].key === key) {
            position = i
        }
    })

    if (position !== null) {
        _db.splice(position, 1)
        fs.writeFileSync('./database/list-testi.json', JSON.stringify(_db, null, 3))
    }
}

function updateResponTesti(key, response, isImage, image_url, _db) {
    let position = null
    Object.keys(_db).forEach((x) => {
        if (_db[x].key === key) {
            position = x
        }
    })
    if (position !== null) {
        _db[position].response = response
        _db[position].isImage = isImage
        _db[position].image_url = image_url
        fs.writeFileSync('./database/list-testi.json', JSON.stringify(_db, null, 3))
    }
}
function addResponProduk(key, response, isImage, image_url, _db) {
    var obj_add = {
        key: key,
        response: response,
        isImage: isImage,
        image_url: image_url
    }
    _db.push(obj_add)
    fs.writeFileSync('./database/list-produk.json', JSON.stringify(_db, null, 3))
}

function getDataResponProduk(key, _db) {
    let position = null
    Object.keys(_db).forEach((x) => {
        if (_db[x].key === key) {
            position = x
        }
    })
    if (position !== null) {
        return _db[position]
    }
}

function isAlreadyResponProduk(key, _db) {
    let found = false
    Object.keys(_db).forEach((x) => {
        if (_db[x].key === key) {
            found = true
        }
    })
    return found
}

function sendResponProduk(key, _dir) {
    let position = null
    Object.keys(_dir).forEach((x) => {
        if (_dir[x].key === key) {
            position = x
        }
    })
    if (position !== null) {
        return _dir[position].response
    }
}

function resetProdukAll(_db) {
    _db.splice(position, 1)
    fs.writeFileSync('./database/list-produk.json', JSON.stringify(_db, null, 3))
}

function delResponProduk(key, _db) {
    let position = null
    Object.keys(_db).forEach((i) => {
        if (_db[i].key === key) {
            position = i
        }
    })

    if (position !== null) {
        _db.splice(position, 1)
        fs.writeFileSync('./database/list-produk.json', JSON.stringify(_db, null, 3))
    }
}

function updateResponProduk(key, response, isImage, image_url, _db) {
    let position = null
    Object.keys(_db).forEach((x) => {
        if (_db[x].key === key) {
            position = x
        }
    })
    if (position !== null) {
        _db[position].response = response
        _db[position].isImage = isImage
        _db[position].image_url = image_url
        fs.writeFileSync('./database/list-produk.json', JSON.stringify(_db, null, 3))
    }
}

const isSetDone = (groupID, _db) => {
    let found = false
    Object.keys(_db).forEach((x) => {
        if (_db[x].id === groupID) {
            found = true
        }
    })
    return found
}

const changeSetDone = (teks, groupID, _db) => {
    let position = null
    Object.keys(_db).forEach((x) => {
        if (_db[x].id === groupID) {
            position = x
        }
    })
    if (position !== null) {
        _db[position].text = teks
        fs.writeFileSync('./database/set_done.json', JSON.stringify(_db, null, 3))
    }
}

const addSetDone = (teks, groupID, _db) => {
    const obj_add = {
        id: groupID,
        text: teks
    }
    _db.push(obj_add)
    fs.writeFileSync('./database/set_done.json', JSON.stringify(_db, null, 3))
}

const removeSetDone = (groupID, _db) => {
    let position = null
    Object.keys(_db).forEach((x) => {
        if (_db[x].id === groupID) {
            position = x
        }
    })
    if (position !== null) {
        _db.splice(position, 1)
        fs.writeFileSync('./database/set_done.json', JSON.stringify(_db, null, 3))
    }
}

const getTextSetDone = (groupID, _db) => {
    let position = null
    Object.keys(_db).forEach((x) => {
        if (_db[x].id === groupID) {
            position = x
        }
    })
    if (position !== null) {
        return _db[position].text
    }
}

const isSetProses = (groupID, _db) => {
    let found = false
    Object.keys(_db).forEach((x) => {
        if (_db[x].id === groupID) {
            found = true
        }
    })
    return found
}

const changeSetProses = (teks, groupID, _db) => {
    let position = null
    Object.keys(_db).forEach((x) => {
        if (_db[x].id === groupID) {
            position = x
        }
    })
    if (position !== null) {
        _db[position].text = teks
        fs.writeFileSync('./database/set_proses.json', JSON.stringify(_db, null, 3))
    }
}

const addSetProses = (teks, groupID, _db) => {
    const obj_add = {
        id: groupID,
        text: teks
    }
    _db.push(obj_add)
    fs.writeFileSync('./database/set_proses.json', JSON.stringify(_db, null, 3))
}

const removeSetProses = (groupID, _db) => {
    let position = null
    Object.keys(_db).forEach((x) => {
        if (_db[x].id === groupID) {
            position = x
        }
    })
    if (position !== null) {
        _db.splice(position, 1)
        fs.writeFileSync('./database/set_proses.json', JSON.stringify(_db, null, 3))
    }
}

const getTextSetProses = (groupID, _db) => {
    let position = null
    Object.keys(_db).forEach((x) => {
        if (_db[x].id === groupID) {
            position = x
        }
    })
    if (position !== null) {
        return _db[position].text
    }
}
const addSewaGroup = (gid, expired, _dir) => {
  const obj = { id: gid, waktu: expired, expired: Date.now() + toMs(expired), status: true };
  _dir.push(obj);
  fs.writeFileSync("./database/sewa.json", JSON.stringify(_dir, null, 2));
};
const expiredCheck = (conn, _dir) => {
  setInterval(() => {
    let position = null;
    Object.keys(_dir).forEach((i) => {
      if (Date.now() >= _dir[i].expired) {
        position = i;
      }
    });
    if (position !== null) {
      console.log(`Waktu Sewa selesai > ${_dir[position].id}`);
        conn.sendMessage(_dir[position].id, { text: `「 *WAKTU SEWA HABIS* 」\n\nTrimakasih sudah order\nMohon maaf jika bot melakukan kesalahan, order lagi silahkan chat owner`, })
        .then(async (res) => {
          await conn.groupLeave(_dir[position].id);
          _dir.splice(position, 1);
          fs.writeFileSync(
            "./database/sewa.json",
            JSON.stringify(_dir, null, 2)
          );
        });
    }
  }, 1000);
};
const getSewaPosition = (gid, _dir) => {
  let position = null;
  Object.keys(_dir).forEach((i) => {
    if (_dir[i].id === gid) {
      position = i;
    }
  });
  if (position !== null) {
    return position;
  }
};

const getSewaExpired = (gid, _dir) => {
  let position = null;
  Object.keys(_dir).forEach((i) => {
    if (_dir[i].id === gid) {
      position = i;
    }
  });
  if (position !== null) {
    return _dir[position].expired;
  }
};

const checkSewaGroup = (gid, _dir) => {
  let status = false;
  Object.keys(_dir).forEach((i) => {
    if (_dir[i].id === gid) {
      status = true;
    }
  });
  return status;
};


module.exports = { addResponList, delResponList, isAlreadyResponList, isAlreadyResponListGroup, sendResponList, updateResponList, getDataResponList, addResponTesti,
    delResponTesti,
    resetTestiAll,
    isAlreadyResponTesti,
    sendResponTesti,
    updateResponTesti,
    getDataResponTesti,
addResponProduk,
    delResponProduk,
    resetProdukAll,
    isAlreadyResponProduk,
    sendResponProduk,
    updateResponProduk,
    getDataResponProduk,
 isSetDone,
    addSetDone,
    removeSetDone,
    changeSetDone,
    getTextSetDone,
isSetProses,
    addSetProses,
    removeSetProses,
    changeSetProses,
    getTextSetProses,
addSewaGroup,
  getSewaExpired,
  getSewaPosition,
  expiredCheck,
  checkSewaGroup }