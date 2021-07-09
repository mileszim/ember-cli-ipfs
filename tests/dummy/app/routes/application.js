import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
// import { action } from '@ember/object';

export default class ApplicationRoute extends Route {
  @service('node') ipfs;

  async model() {
    await this.ipfs.start('/tmp/test-node');
    const nodeId = this.ipfs.id;
    return {
      id: nodeId,
      ipfs: this.ipfs,
    }
  }
}
