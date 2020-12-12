interface ParamProps {
  [nameSpace: string]: any;
}

class Storage {
  storage: any;

  constructor(storage: any) {
    this.storage = storage;
  }

  get(key: string, defaultValue?: any) {
    let data = this.storage.getItem(key);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        return data;
      }
    }
    return defaultValue;
  }

  set(key: string, value: any) {
    if (typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    this.storage.setItem(key, value);
  }

  setItems(params: ParamProps) {
    Object.keys(params).forEach(key => this.set(key, params[key]));
  }

  remove(key: string | Array<string>) {
    if (Array.isArray(key)) {
      key.forEach(k => this.storage.removeItem(k));
    } else {
      this.storage.removeItem(key);
    }
  }

  clear() {
    this.storage.clear();
  }

  // 所有健名
  keys() {
    const keys: Array<string> = [];
    for (let i = 0; i < this.storage.length; i++) {
      keys.push(this.storage.key(i));
    }
    return keys;
  }
}

export default new Storage(localStorage);

export const session = new Storage(sessionStorage);

// storage的key列表，统一管理
export const storageKeys: { [nameSpace: string]: string } = {
  // 系统的
  sysToken: 'SYSTEM_TOKEN',
  sysTokenType: 'SYSTEM_TOKEN_TYPE',
  sysTokenExpire: 'SYSTEM_TOKEN_EXPIRE',

  userInfo: 'USER_INFO', // 用户信息
  loginErrorCount: 'LOGIN_ERROR_COUNT', // 登录错误次数
  cacheTimeMap: 'CACHE_TIME_MAP', // 用作缓存的
};
// Object.freeze(storageKeys);
