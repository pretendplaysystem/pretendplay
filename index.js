(function () {
  const p = function(a, i, v) {
    if (i >= 0 && i <= a.length) { a.splice(i, 0, v); }
    else { throw new Error("Index out of bounds"); }
  };
  const s = function(k,a) { return a.filter(function(x){return x == k;}); };
  window.toyApp = {
    list: [
      "スマイルスライム", "ぽてぽてサメにゃん", "ぽてたまサメにゃん(グレー)", "着ぐるみにゃん(うさぎ)",
      "さくら(忠犬もちしば)BCチャーム", "めざましくん(S)", "アザラシの赤ちゃん", "カクレクマノミ",
      "こむぎ(忠犬もちしばまるふく探偵団BCチャーム)", "ユニコーン", "ムーンフレンズ2フォックス", "ムーンフレンズ2バニー",
      "推し活ころころにゃんこしろにゃん", "推し活ころころにゃんこおれんじにゃん", "推し活ころころにゃんこももにゃん",
      "推し活ころころにゃんこきいろにゃん", "カラーセレクションエーフィpurple", "カラーセレクションシェイミgreen",
      "ぴょんちー", "コンと九尾さま狛狐", "シマちゃん", "ウェンダビッグﾞ", "キュアフレンズキュアアイドル",
      "ぷちきゅあほるもん", "グレイ", "ピンキー", "ひっくりかえるおたまじゃくし",
      "ハッピーセット マイメロディのマスコット", "ハッピーセット  マイメロディのマスコット(2)",
      "うるる", "サイモン", "ぺたふれキーホルダーねずみ"
    ],
    setItem:function(v,i){p(toyApp.list, Number(i), String(v));return this;},
    removeItem:function(v){if(!toyApp.FORMERLIST.includes(v))toyApp.list=toyApp.list.filter(function(s){return s !== v;});return this;},
    search:function(k){return s(k, toyApp.list);},
    _FORMERLIST : ["スマイルスライム", "ぽてぽてサメにゃん", "ぽてたまサメにゃん(グレー)", "着ぐるみにゃん(うさぎ)","さくら(忠犬もちしば)BCチャーム", "めざましくん(S)", "アザラシの赤ちゃん", "カクレクマノミ", "こむぎ(忠犬もちしばまるふく探偵団BCチャーム)", "ユニコーン", "ムーンフレンズ2フォックス", "ムーンフレンズ2バニー", "推し活ころころにゃんこしろにゃん", "推し活ころころにゃんこおれんじにゃん", "推し活ころころにゃんこももにゃん", "推し活ころころにゃんこきいろにゃん", "カラーセレクションエーフィpurple", "カラーセレクションシェイミgreen", "ぴょんちー", "コンと九尾さま狛狐", "シマちゃん", "ウェンダビッグﾞ", "キュアフレンズキュアアイドル", "ぷちきゅあほるもん", "グレイ", "ピンキー", "ひっくりかえるおたまじゃくし", "ハッピーセット マイメロディのマスコット", "ハッピーセット  マイメロディのマスコット(2)", "うるる", "サイモン", "ぺたふれキーホルダーねずみ"],
    get FORMERLIST(){return this._FORMERLIST;}
  };

  window.playApp = {
    list: [
      ["色ごっこ", {
        category: "rule",
        mixColors: function (c) {
          return !Array.isArray(c) || !c.length ? "#000000" :
            "#" + [0, 1, 2].map(function (i) {
              return ("0" + Math.floor(
                c.map(function (hex) {
                  return parseInt(hex.replace(/[^#0-9a-fA-F]/g, "").slice(1).substr(i * 2, 2), 16);
                }).reduce(function (a, b) { return a + b; }, 0) / c.length
              ).toString(16)).slice(-2);
            }).join("");
        }
      }],
      ["溶岩ごっこ", {
        category: "rule",
        status: "normal",
        up: function () { window.playApp.list[1][1].status = "up"; },
        down: function () { window.playApp.list[1][1].status = "down"; }
      }],
      ["遊園地ごっこ", { category: "pretend" }],
      ["学校ごっこ", { category: "education" }],
      ["ソファごっこ", { category: "MakeSomething" }],
      ["アスレチックごっこ", { category: "motion" }],
      ["紙人形ごっこ", { category: "pretend" }],
      ["お家ごっこ", { category: "life" }],
      ["2階で遊ぶごっこ", { category: "rule" }],
      ["電動客車ごっこ", { category: "pretend" }],
      ["プラレールごっこ", { category: "MakeSomething" }],
      ["お絵かきごっこ", { category: "art" }],
      ["歯磨きごっこ", { category: "pretend" }],
      ["病院ごっこ", { category: "pretend" }],
      ["回転ごっこ", {
        category: "motion",
        _power: false,
        _speed: 0,
        get power() { return this._power; },
        set power(v) {
          this._power = Boolean(v);
          if (this._power) this._speed = 0;
        },
        get speed() { return this._speed; },
        set speed(v) {
          this._speed = Number.isNaN(Number(v)) ? 0 : Number(v);
        }
      }],
      ["8番現実乗場ごっこ", { category: "pretend" }],
      ["8番現実出口ごっこ", { category: "pretend" }],
      ["8番乗場ごっこ", { category: "rule" }],
      ["8番出口ごっこ", { category: "rule" }],
      ["美容院ごっこ", { category: "pretend" }],
      ["おやつカードゲーム", { category: "rule" }]
    ]
  };

  window.Organism = class {
    static sexMap = {
      woman: "woman",
      Woman: "woman",
      man: "man",
      Man: "man"
    };

    static MAX_AGE = 130;
    static MIN_AGE = 0;

    constructor(name, age, sex) {
      this._name = name ? String(name) : null;
      this._age = age ? Number(age) : 0;
      this._sex = Organism.sexMap[sex] ? Organism.sexMap[sex] : "man";
      this._location = { x: 0, y: 0, z: 0 };
      this._die = false;
      this.participating = [];
    }

    get name() { return this._name; }
    get age() { return this._age; }
    get sex() { return this._sex; }
    get location() { return this._location; }
    get die() { return this._die; }

    set name(v) {
      this._name = String(v) || null;
      return this;
    }

    set age(v) {
      this._age = Number(v) || 0;
      return this;
    }

    set sex(v) {
      this._sex = Organism.sexMap[v] || "man";
      return this;
    }

    set location(v) {
      this._location = Object(v);
      return this;
    }

    set die(v) {
      this._die = v;
      return this;
    }

    walk(x, y, z) {
      this.location = {
        x: Number.isNaN(Number(x)) ? 0 : Number(x),
        y: Number.isNaN(Number(y)) ? 0 : Number(y),
        z: Number.isNaN(Number(z)) ? 0 : Number(z)
      };
      return this;
    }

    participate(n) {
      const names = playApp.list.map(i => i[0]);
      this.participating = names[n] ? names[n] : [];
      return this;
    }

    valueOf() {
      return this.age;
    }
  };
})();
