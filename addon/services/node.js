import Service from '@ember/service';
import { debug } from '@ember/debug';

import IPFS from 'ipfs-core';
const { urlSource } = IPFS;

export default class NodeService extends Service {
  _ipfs = null;
  _node  = null;
  _nodeId = null;

  async start(repo = './ipfs') {
    debug('IPFS Starting...');
    this._ipfs = await IPFS.create({ repo });
    this._node = await this._ipfs.id();
    this._nodeId = this._node.id;
    debug('IPFS Started:', this._node.id);
  }

  async stop() {
    debug('IPFS Stopping: ', this.id);
    this._node.stop();
    debug('IPFS Stopped: ', this.id);
  }

  willDestroy() {
    this.super(...arguments);
    const nodeId = this.node.id;
    debug('Destroying IPFS: ', nodeId);
    this._node = null;
    debug('Destroying IPFS: ', nodeId);
  }

  get node() {
    return this._ipfs;
  }

  get id() {
    return this._nodeId;
  }

  /* Add data to node. Returns the data CID
   *
   * @return [String] cid
   */
  add(data) {
    debug('IPFS - Adding Data...');
    const { cid } = this._ipfs.add(data);
    debug('IPFS - Finished Adding Data - CID: ', cid);
    return cid;
  }

  addUrl(url) {
    debug('IPFS - Adding Data from url:', url);
    const { cid } = this._ipfs.add(urlSource(url));
    debug('IPFS - Finished adding data from url:', url, ' - ', cid);
    return cid;
  }
}
