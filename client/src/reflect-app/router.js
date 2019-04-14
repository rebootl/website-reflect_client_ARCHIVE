
// components that want routing should register using:
//   Router.register(this)
//
// they shall implement:
//   comp.router_update(url_state_obj)
// which will be called on url update/page load
//
// url_state_obj being something like: {
//  route: 'blabla',
//  params: {
//    k1: 'v1',
//    k2: 'v2'
//  }
// }
const registered_components = new Set();

const dec = decodeURIComponent;

export class Router {
  static register(comp) {
    registered_components.add(comp);
  }
  constructor() {
    window.addEventListener('hashchange', ()=>this.url_change());
    window.addEventListener('load', ()=>this.url_change());
  }
  url_change() {
    let params = {};
    const hash_str = location.hash.slice(1) || '';
    const route_params = hash_str.split('?');
    if (route_params.length > 1) {
      // extract params from params_str
      const param_pairs = route_params[1].split('&');
      param_pairs.forEach(pp => {
        let k, v;
        [ k, v ] = pp.split('=');
        if (k.endsWith('[]')) {
          const k_name = k.slice(0, -2);
          if (params.hasOwnProperty(k_name)) {
            params[dec(k_name)].push(dec(v));
          } else {
            params[dec(k_name)] = [ dec(v) ];
          }
        } else {
          params[dec(k)] = dec(v);
        }
      });
    }
    //console.log(route_params[0]);
    //console.log(params);
    registered_components.forEach(comp => {
      console.log("router update");
      comp.router_update({ route: route_params[0], params: params });
    })
  }
    // old version
    /*let route, params_str;
    if (hash_str.includes('?')) {
      [ route, params_str ] = hash_str.split('?');

    } else {
      route = hash_str;
      params_str = "";
    }*/
    //console.log(route);
    /*if (!routes.hasOwnProperty(ref)) {
      console.log('route not found, using "entries"');
      ref = 'entries';
    }*/
}

const myrouter = new Router();
