/**
 * Copyright 2023 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as Bidi from 'chromium-bidi/lib/cjs/protocol/protocol.js';

import {ElementHandle as BaseElementHandle} from '../../api/ElementHandle.js';

import {Frame} from './Frame.js';
import {JSHandle} from './JSHandle.js';
import {Realm} from './Realm.js';

/**
 * @internal
 */
export class ElementHandle<
  ElementType extends Node = Element
> extends BaseElementHandle<ElementType> {
  declare handle: JSHandle<ElementType>;
  #frame: Frame;

  constructor(
    realm: Realm,
    remoteValue: Bidi.CommonDataTypes.RemoteValue,
    frame: Frame
  ) {
    super(new JSHandle(realm, remoteValue));
    this.#frame = frame;
  }

  override get frame(): Frame {
    return this.#frame;
  }

  context(): Realm {
    return this.handle.context();
  }

  get isPrimitiveValue(): boolean {
    return this.handle.isPrimitiveValue;
  }

  remoteValue(): Bidi.CommonDataTypes.RemoteValue {
    return this.handle.remoteValue();
  }

  /**
   * @internal
   */
  override assertElementHasWorld(): asserts this {
    // TODO: Should assert element has a Sandbox
    return;
  }
}
