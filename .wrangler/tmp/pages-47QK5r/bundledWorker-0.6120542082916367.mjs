var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn2 = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn2, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// ../node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn2) {
    return fn2;
  }
  runInAsyncScope(fn2, thisArg, ...args) {
    return fn2.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// ../node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// ../node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// ../node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// ../node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// ../node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// ../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// ../node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// ../node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// ../node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// ../node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// ../node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// ../node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// ../node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var {
  _channel,
  _debugEnd,
  _debugProcess,
  _disconnect,
  _events,
  _eventsCount,
  _exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _handleQueue,
  _kill,
  _linkedBinding,
  _maxListeners,
  _pendingMessage,
  _preload_modules,
  _rawDebug,
  _send,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert: assert2,
  availableMemory,
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  disconnect,
  dlopen,
  domain,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime: hrtime3,
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  mainModule,
  memoryUsage,
  moduleLoadList,
  nextTick,
  off,
  on,
  once,
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// ../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// _worker.js
var Fr = Object.defineProperty;
var It = /* @__PURE__ */ __name((e) => {
  throw TypeError(e);
}, "It");
var Gr = /* @__PURE__ */ __name((e, t, r) => t in e ? Fr(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r, "Gr");
var v = /* @__PURE__ */ __name((e, t, r) => Gr(e, typeof t != "symbol" ? t + "" : t, r), "v");
var ct = /* @__PURE__ */ __name((e, t, r) => t.has(e) || It("Cannot " + r), "ct");
var f = /* @__PURE__ */ __name((e, t, r) => (ct(e, t, "read from private field"), r ? r.call(e) : t.get(e)), "f");
var k = /* @__PURE__ */ __name((e, t, r) => t.has(e) ? It("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), "k");
var b = /* @__PURE__ */ __name((e, t, r, n) => (ct(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r), "b");
var R = /* @__PURE__ */ __name((e, t, r) => (ct(e, t, "access private method"), r), "R");
var Tt = /* @__PURE__ */ __name((e, t, r, n) => ({ set _(i) {
  b(e, t, i, r);
}, get _() {
  return f(e, t, n);
} }), "Tt");
var ir = { Stringify: 1 };
var T = /* @__PURE__ */ __name((e, t) => {
  const r = new String(e);
  return r.isEscaped = true, r.callbacks = t, r;
}, "T");
var qr = /[&<>'"]/;
var ar = /* @__PURE__ */ __name(async (e, t) => {
  let r = "";
  t || (t = []);
  const n = await Promise.all(e);
  for (let i = n.length - 1; r += n[i], i--, !(i < 0); i--) {
    let a = n[i];
    typeof a == "object" && t.push(...a.callbacks || []);
    const l = a.isEscaped;
    if (a = await (typeof a == "object" ? a.toString() : a), typeof a == "object" && t.push(...a.callbacks || []), a.isEscaped ?? l) r += a;
    else {
      const o = [r];
      ee(a, o), r = o[0];
    }
  }
  return T(r, t);
}, "ar");
var ee = /* @__PURE__ */ __name((e, t) => {
  const r = e.search(qr);
  if (r === -1) {
    t[0] += e;
    return;
  }
  let n, i, a = 0;
  for (i = r; i < e.length; i++) {
    switch (e.charCodeAt(i)) {
      case 34:
        n = "&quot;";
        break;
      case 39:
        n = "&#39;";
        break;
      case 38:
        n = "&amp;";
        break;
      case 60:
        n = "&lt;";
        break;
      case 62:
        n = "&gt;";
        break;
      default:
        continue;
    }
    t[0] += e.substring(a, i) + n, a = i + 1;
  }
  t[0] += e.substring(a, i);
}, "ee");
var lr = /* @__PURE__ */ __name((e) => {
  const t = e.callbacks;
  if (!(t != null && t.length)) return e;
  const r = [e], n = {};
  return t.forEach((i) => i({ phase: ir.Stringify, buffer: r, context: n })), r[0];
}, "lr");
var or = /* @__PURE__ */ __name(async (e, t, r, n, i) => {
  typeof e == "object" && !(e instanceof String) && (e instanceof Promise || (e = e.toString()), e instanceof Promise && (e = await e));
  const a = e.callbacks;
  return a != null && a.length ? (i ? i[0] += e : i = [e], Promise.all(a.map((o) => o({ phase: t, buffer: i, context: n }))).then((o) => Promise.all(o.filter(Boolean).map((c) => or(c, t, false, n, i))).then(() => i[0]))) : Promise.resolve(e);
}, "or");
var Ur = /* @__PURE__ */ __name((e, ...t) => {
  const r = [""];
  for (let n = 0, i = e.length - 1; n < i; n++) {
    r[0] += e[n];
    const a = Array.isArray(t[n]) ? t[n].flat(1 / 0) : [t[n]];
    for (let l = 0, o = a.length; l < o; l++) {
      const c = a[l];
      if (typeof c == "string") ee(c, r);
      else if (typeof c == "number") r[0] += c;
      else {
        if (typeof c == "boolean" || c === null || c === void 0) continue;
        if (typeof c == "object" && c.isEscaped) if (c.callbacks) r.unshift("", c);
        else {
          const d = c.toString();
          d instanceof Promise ? r.unshift("", d) : r[0] += d;
        }
        else c instanceof Promise ? r.unshift("", c) : ee(c.toString(), r);
      }
    }
  }
  return r[0] += e.at(-1), r.length === 1 ? "callbacks" in r ? T(lr(T(r[0], r.callbacks))) : T(r[0]) : ar(r, r.callbacks);
}, "Ur");
var Rt = /* @__PURE__ */ Symbol("RENDERER");
var yt = /* @__PURE__ */ Symbol("ERROR_HANDLER");
var A = /* @__PURE__ */ Symbol("STASH");
var cr = /* @__PURE__ */ Symbol("INTERNAL");
var Kr = /* @__PURE__ */ Symbol("MEMO");
var nt = /* @__PURE__ */ Symbol("PERMALINK");
var Dt = /* @__PURE__ */ __name((e) => (e[cr] = true, e), "Dt");
var dr = /* @__PURE__ */ __name((e) => ({ value: t, children: r }) => {
  if (!r) return;
  const n = { children: [{ tag: Dt(() => {
    e.push(t);
  }), props: {} }] };
  Array.isArray(r) ? n.children.push(...r.flat()) : n.children.push(r), n.children.push({ tag: Dt(() => {
    e.pop();
  }), props: {} });
  const i = { tag: "", props: n, type: "" };
  return i[yt] = (a) => {
    throw e.pop(), a;
  }, i;
}, "dr");
var fr = /* @__PURE__ */ __name((e) => {
  const t = [e], r = dr(t);
  return r.values = t, r.Provider = r, Re.push(r), r;
}, "fr");
var Re = [];
var Pt = /* @__PURE__ */ __name((e) => {
  const t = [e], r = /* @__PURE__ */ __name(((n) => {
    t.push(n.value);
    let i;
    try {
      i = n.children ? (Array.isArray(n.children) ? new mr("", {}, n.children) : n.children).toString() : "";
    } catch (a) {
      throw t.pop(), a;
    }
    return i instanceof Promise ? i.finally(() => t.pop()).then((a) => T(a, a.callbacks)) : (t.pop(), T(i));
  }), "r");
  return r.values = t, r.Provider = r, r[Rt] = dr(t), Re.push(r), r;
}, "Pt");
var Ae = /* @__PURE__ */ __name((e) => e.values.at(-1), "Ae");
var Qe = { title: [], script: ["src"], style: ["data-href"], link: ["href"], meta: ["name", "httpEquiv", "charset", "itemProp"] };
var bt = {};
var Je = "data-precedence";
var Ge = /* @__PURE__ */ __name((e) => Array.isArray(e) ? e : [e], "Ge");
var Nt = /* @__PURE__ */ new WeakMap();
var Bt = /* @__PURE__ */ __name((e, t, r, n) => ({ buffer: i, context: a }) => {
  if (!i) return;
  const l = Nt.get(a) || {};
  Nt.set(a, l);
  const o = l[e] || (l[e] = []);
  let c = false;
  const d = Qe[e];
  if (d.length > 0) {
    e: for (const [, h] of o) for (const u of d) if (((h == null ? void 0 : h[u]) ?? null) === (r == null ? void 0 : r[u])) {
      c = true;
      break e;
    }
  }
  if (c ? i[0] = i[0].replaceAll(t, "") : d.length > 0 ? o.push([t, r, n]) : o.unshift([t, r, n]), i[0].indexOf("</head>") !== -1) {
    let h;
    if (n === void 0) h = o.map(([u]) => u);
    else {
      const u = [];
      h = o.map(([p, , m]) => {
        let g = u.indexOf(m);
        return g === -1 && (u.push(m), g = u.length - 1), [p, g];
      }).sort((p, m) => p[1] - m[1]).map(([p]) => p);
    }
    h.forEach((u) => {
      i[0] = i[0].replaceAll(u, "");
    }), i[0] = i[0].replace(/(?=<\/head>)/, h.join(""));
  }
}, "Bt");
var qe = /* @__PURE__ */ __name((e, t, r) => T(new z(e, r, Ge(t ?? [])).toString()), "qe");
var Ue = /* @__PURE__ */ __name((e, t, r, n) => {
  if ("itemProp" in r) return qe(e, t, r);
  let { precedence: i, blocking: a, ...l } = r;
  i = n ? i ?? "" : void 0, n && (l[Je] = i);
  const o = new z(e, l, Ge(t || [])).toString();
  return o instanceof Promise ? o.then((c) => T(o, [...c.callbacks || [], Bt(e, c, l, i)])) : T(o, [Bt(e, o, l, i)]);
}, "Ue");
var Wr = /* @__PURE__ */ __name(({ children: e, ...t }) => {
  const r = At();
  if (r) {
    const n = Ae(r);
    if (n === "svg" || n === "head") return new z("title", t, Ge(e ?? []));
  }
  return Ue("title", e, t, false);
}, "Wr");
var Vr = /* @__PURE__ */ __name(({ children: e, ...t }) => {
  const r = At();
  return ["src", "async"].some((n) => !t[n]) || r && Ae(r) === "head" ? qe("script", e, t) : Ue("script", e, t, false);
}, "Vr");
var Qr = /* @__PURE__ */ __name(({ children: e, ...t }) => ["href", "precedence"].every((r) => r in t) ? (t["data-href"] = t.href, delete t.href, Ue("style", e, t, true)) : qe("style", e, t), "Qr");
var Jr = /* @__PURE__ */ __name(({ children: e, ...t }) => ["onLoad", "onError"].some((r) => r in t) || t.rel === "stylesheet" && (!("precedence" in t) || "disabled" in t) ? qe("link", e, t) : Ue("link", e, t, "precedence" in t), "Jr");
var Xr = /* @__PURE__ */ __name(({ children: e, ...t }) => {
  const r = At();
  return r && Ae(r) === "head" ? qe("meta", e, t) : Ue("meta", e, t, false);
}, "Xr");
var hr = /* @__PURE__ */ __name((e, { children: t, ...r }) => new z(e, r, Ge(t ?? [])), "hr");
var Zr = /* @__PURE__ */ __name((e) => (typeof e.action == "function" && (e.action = nt in e.action ? e.action[nt] : void 0), hr("form", e)), "Zr");
var ur = /* @__PURE__ */ __name((e, t) => (typeof t.formAction == "function" && (t.formAction = nt in t.formAction ? t.formAction[nt] : void 0), hr(e, t)), "ur");
var Yr = /* @__PURE__ */ __name((e) => ur("input", e), "Yr");
var en = /* @__PURE__ */ __name((e) => ur("button", e), "en");
var dt = Object.freeze(Object.defineProperty({ __proto__: null, button: en, form: Zr, input: Yr, link: Jr, meta: Xr, script: Vr, style: Qr, title: Wr }, Symbol.toStringTag, { value: "Module" }));
var tn = /* @__PURE__ */ new Map([["className", "class"], ["htmlFor", "for"], ["crossOrigin", "crossorigin"], ["httpEquiv", "http-equiv"], ["itemProp", "itemprop"], ["fetchPriority", "fetchpriority"], ["noModule", "nomodule"], ["formAction", "formaction"]]);
var st = /* @__PURE__ */ __name((e) => tn.get(e) || e, "st");
var pr = /* @__PURE__ */ __name((e, t) => {
  for (const [r, n] of Object.entries(e)) {
    const i = r[0] === "-" || !/[A-Z]/.test(r) ? r : r.replace(/[A-Z]/g, (a) => `-${a.toLowerCase()}`);
    t(i, n == null ? null : typeof n == "number" ? i.match(/^(?:a|border-im|column(?:-c|s)|flex(?:$|-[^b])|grid-(?:ar|[^a])|font-w|li|or|sca|st|ta|wido|z)|ty$/) ? `${n}` : `${n}px` : n);
  }
}, "pr");
var Ie = void 0;
var At = /* @__PURE__ */ __name(() => Ie, "At");
var rn = /* @__PURE__ */ __name((e) => /[A-Z]/.test(e) && e.match(/^(?:al|basel|clip(?:Path|Rule)$|co|do|fill|fl|fo|gl|let|lig|i|marker[EMS]|o|pai|pointe|sh|st[or]|text[^L]|tr|u|ve|w)/) ? e.replace(/([A-Z])/g, "-$1").toLowerCase() : e, "rn");
var nn = ["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"];
var sn = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "defer", "disabled", "download", "formnovalidate", "hidden", "inert", "ismap", "itemscope", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "selected"];
var Ct = /* @__PURE__ */ __name((e, t) => {
  for (let r = 0, n = e.length; r < n; r++) {
    const i = e[r];
    if (typeof i == "string") ee(i, t);
    else {
      if (typeof i == "boolean" || i === null || i === void 0) continue;
      i instanceof z ? i.toStringToBuffer(t) : typeof i == "number" || i.isEscaped ? t[0] += i : i instanceof Promise ? t.unshift("", i) : Ct(i, t);
    }
  }
}, "Ct");
var z = class {
  static {
    __name(this, "z");
  }
  constructor(e, t, r) {
    v(this, "tag");
    v(this, "props");
    v(this, "key");
    v(this, "children");
    v(this, "isEscaped", true);
    v(this, "localContexts");
    this.tag = e, this.props = t, this.children = r;
  }
  get type() {
    return this.tag;
  }
  get ref() {
    return this.props.ref || null;
  }
  toString() {
    var t, r;
    const e = [""];
    (t = this.localContexts) == null || t.forEach(([n, i]) => {
      n.values.push(i);
    });
    try {
      this.toStringToBuffer(e);
    } finally {
      (r = this.localContexts) == null || r.forEach(([n]) => {
        n.values.pop();
      });
    }
    return e.length === 1 ? "callbacks" in e ? lr(T(e[0], e.callbacks)).toString() : e[0] : ar(e, e.callbacks);
  }
  toStringToBuffer(e) {
    const t = this.tag, r = this.props;
    let { children: n } = this;
    e[0] += `<${t}`;
    const i = Ie && Ae(Ie) === "svg" ? (a) => rn(st(a)) : (a) => st(a);
    for (let [a, l] of Object.entries(r)) if (a = i(a), a !== "children") {
      if (a === "style" && typeof l == "object") {
        let o = "";
        pr(l, (c, d) => {
          d != null && (o += `${o ? ";" : ""}${c}:${d}`);
        }), e[0] += ' style="', ee(o, e), e[0] += '"';
      } else if (typeof l == "string") e[0] += ` ${a}="`, ee(l, e), e[0] += '"';
      else if (l != null) if (typeof l == "number" || l.isEscaped) e[0] += ` ${a}="${l}"`;
      else if (typeof l == "boolean" && sn.includes(a)) l && (e[0] += ` ${a}=""`);
      else if (a === "dangerouslySetInnerHTML") {
        if (n.length > 0) throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
        n = [T(l.__html)];
      } else if (l instanceof Promise) e[0] += ` ${a}="`, e.unshift('"', l);
      else if (typeof l == "function") {
        if (!a.startsWith("on") && a !== "ref") throw new Error(`Invalid prop '${a}' of type 'function' supplied to '${t}'.`);
      } else e[0] += ` ${a}="`, ee(l.toString(), e), e[0] += '"';
    }
    if (nn.includes(t) && n.length === 0) {
      e[0] += "/>";
      return;
    }
    e[0] += ">", Ct(n, e), e[0] += `</${t}>`;
  }
};
var ft = class extends z {
  static {
    __name(this, "ft");
  }
  toStringToBuffer(e) {
    const { children: t } = this, r = { ...this.props };
    t.length && (r.children = t.length === 1 ? t[0] : t);
    const n = this.tag.call(null, r);
    if (!(typeof n == "boolean" || n == null)) if (n instanceof Promise) if (Re.length === 0) e.unshift("", n);
    else {
      const i = Re.map((a) => [a, a.values.at(-1)]);
      e.unshift("", n.then((a) => (a instanceof z && (a.localContexts = i), a)));
    }
    else n instanceof z ? n.toStringToBuffer(e) : typeof n == "number" || n.isEscaped ? (e[0] += n, n.callbacks && (e.callbacks || (e.callbacks = []), e.callbacks.push(...n.callbacks))) : ee(n, e);
  }
};
var mr = class extends z {
  static {
    __name(this, "mr");
  }
  toStringToBuffer(e) {
    Ct(this.children, e);
  }
};
var Ht = /* @__PURE__ */ __name((e, t, ...r) => {
  t ?? (t = {}), r.length && (t.children = r.length === 1 ? r[0] : r);
  const n = t.key;
  delete t.key;
  const i = Xe(e, t, r);
  return i.key = n, i;
}, "Ht");
var zt = false;
var Xe = /* @__PURE__ */ __name((e, t, r) => {
  if (!zt) {
    for (const n in bt) dt[n][Rt] = bt[n];
    zt = true;
  }
  return typeof e == "function" ? new ft(e, t, r) : dt[e] ? new ft(dt[e], t, r) : e === "svg" || e === "head" ? (Ie || (Ie = Pt("")), new z(e, t, [new ft(Ie, { value: e }, r)])) : new z(e, t, r);
}, "Xe");
var gr = /* @__PURE__ */ __name(({ children: e }) => new mr("", { children: e }, Array.isArray(e) ? e : e ? [e] : []), "gr");
function s(e, t, r) {
  let n;
  if (!t || !("children" in t)) n = Xe(e, t, []);
  else {
    const i = t.children;
    n = Array.isArray(i) ? Xe(e, t, i) : Xe(e, t, [i]);
  }
  return n.key = r, n;
}
__name(s, "s");
var _t = /* @__PURE__ */ __name((e, t, r) => (n, i) => {
  let a = -1;
  return l(0);
  async function l(o) {
    if (o <= a) throw new Error("next() called multiple times");
    a = o;
    let c, d = false, h;
    if (e[o] ? (h = e[o][0][0], n.req.routeIndex = o) : h = o === e.length && i || void 0, h) try {
      c = await h(n, () => l(o + 1));
    } catch (u) {
      if (u instanceof Error && t) n.error = u, c = await t(u, n), d = true;
      else throw u;
    }
    else n.finalized === false && r && (c = await r(n));
    return c && (n.finalized === false || d) && (n.res = c), n;
  }
  __name(l, "l");
}, "_t");
var an = /* @__PURE__ */ Symbol();
var ln = /* @__PURE__ */ __name(async (e, t = /* @__PURE__ */ Object.create(null)) => {
  const { all: r = false, dot: n = false } = t, a = (e instanceof kr ? e.raw.headers : e.headers).get("Content-Type");
  return a != null && a.startsWith("multipart/form-data") || a != null && a.startsWith("application/x-www-form-urlencoded") ? on2(e, { all: r, dot: n }) : {};
}, "ln");
async function on2(e, t) {
  const r = await e.formData();
  return r ? cn(r, t) : {};
}
__name(on2, "on");
function cn(e, t) {
  const r = /* @__PURE__ */ Object.create(null);
  return e.forEach((n, i) => {
    t.all || i.endsWith("[]") ? dn(r, i, n) : r[i] = n;
  }), t.dot && Object.entries(r).forEach(([n, i]) => {
    n.includes(".") && (fn(r, n, i), delete r[n]);
  }), r;
}
__name(cn, "cn");
var dn = /* @__PURE__ */ __name((e, t, r) => {
  e[t] !== void 0 ? Array.isArray(e[t]) ? e[t].push(r) : e[t] = [e[t], r] : t.endsWith("[]") ? e[t] = [r] : e[t] = r;
}, "dn");
var fn = /* @__PURE__ */ __name((e, t, r) => {
  let n = e;
  const i = t.split(".");
  i.forEach((a, l) => {
    l === i.length - 1 ? n[a] = r : ((!n[a] || typeof n[a] != "object" || Array.isArray(n[a]) || n[a] instanceof File) && (n[a] = /* @__PURE__ */ Object.create(null)), n = n[a]);
  });
}, "fn");
var vr = /* @__PURE__ */ __name((e) => {
  const t = e.split("/");
  return t[0] === "" && t.shift(), t;
}, "vr");
var hn = /* @__PURE__ */ __name((e) => {
  const { groups: t, path: r } = un(e), n = vr(r);
  return pn(n, t);
}, "hn");
var un = /* @__PURE__ */ __name((e) => {
  const t = [];
  return e = e.replace(/\{[^}]+\}/g, (r, n) => {
    const i = `@${n}`;
    return t.push([i, r]), i;
  }), { groups: t, path: e };
}, "un");
var pn = /* @__PURE__ */ __name((e, t) => {
  for (let r = t.length - 1; r >= 0; r--) {
    const [n] = t[r];
    for (let i = e.length - 1; i >= 0; i--) if (e[i].includes(n)) {
      e[i] = e[i].replace(n, t[r][1]);
      break;
    }
  }
  return e;
}, "pn");
var We = {};
var mn = /* @__PURE__ */ __name((e, t) => {
  if (e === "*") return "*";
  const r = e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (r) {
    const n = `${e}#${t}`;
    return We[n] || (r[2] ? We[n] = t && t[0] !== ":" && t[0] !== "*" ? [n, r[1], new RegExp(`^${r[2]}(?=/${t})`)] : [e, r[1], new RegExp(`^${r[2]}$`)] : We[n] = [e, r[1], true]), We[n];
  }
  return null;
}, "mn");
var jt = /* @__PURE__ */ __name((e, t) => {
  try {
    return t(e);
  } catch {
    return e.replace(/(?:%[0-9A-Fa-f]{2})+/g, (r) => {
      try {
        return t(r);
      } catch {
        return r;
      }
    });
  }
}, "jt");
var gn = /* @__PURE__ */ __name((e) => jt(e, decodeURI), "gn");
var xr = /* @__PURE__ */ __name((e) => {
  const t = e.url, r = t.indexOf("/", t.indexOf(":") + 4);
  let n = r;
  for (; n < t.length; n++) {
    const i = t.charCodeAt(n);
    if (i === 37) {
      const a = t.indexOf("?", n), l = t.indexOf("#", n), o = a === -1 ? l === -1 ? void 0 : l : l === -1 ? a : Math.min(a, l), c = t.slice(r, o);
      return gn(c.includes("%25") ? c.replace(/%25/g, "%2525") : c);
    } else if (i === 63 || i === 35) break;
  }
  return t.slice(r, n);
}, "xr");
var vn = /* @__PURE__ */ __name((e) => {
  const t = xr(e);
  return t.length > 1 && t.at(-1) === "/" ? t.slice(0, -1) : t;
}, "vn");
var me = /* @__PURE__ */ __name((e, t, ...r) => (r.length && (t = me(t, ...r)), `${(e == null ? void 0 : e[0]) === "/" ? "" : "/"}${e}${t === "/" ? "" : `${(e == null ? void 0 : e.at(-1)) === "/" ? "" : "/"}${(t == null ? void 0 : t[0]) === "/" ? t.slice(1) : t}`}`), "me");
var yr = /* @__PURE__ */ __name((e) => {
  if (e.charCodeAt(e.length - 1) !== 63 || !e.includes(":")) return null;
  const t = e.split("/"), r = [];
  let n = "";
  return t.forEach((i) => {
    if (i !== "" && !/\:/.test(i)) n += "/" + i;
    else if (/\:/.test(i)) if (/\?/.test(i)) {
      r.length === 0 && n === "" ? r.push("/") : r.push(n);
      const a = i.replace("?", "");
      n += "/" + a, r.push(n);
    } else n += "/" + i;
  }), r.filter((i, a, l) => l.indexOf(i) === a);
}, "yr");
var ht = /* @__PURE__ */ __name((e) => /[%+]/.test(e) ? (e.indexOf("+") !== -1 && (e = e.replace(/\+/g, " ")), e.indexOf("%") !== -1 ? jt(e, wr) : e) : e, "ht");
var br = /* @__PURE__ */ __name((e, t, r) => {
  let n;
  if (!r && t && !/[%+]/.test(t)) {
    let l = e.indexOf("?", 8);
    if (l === -1) return;
    for (e.startsWith(t, l + 1) || (l = e.indexOf(`&${t}`, l + 1)); l !== -1; ) {
      const o = e.charCodeAt(l + t.length + 1);
      if (o === 61) {
        const c = l + t.length + 2, d = e.indexOf("&", c);
        return ht(e.slice(c, d === -1 ? void 0 : d));
      } else if (o == 38 || isNaN(o)) return "";
      l = e.indexOf(`&${t}`, l + 1);
    }
    if (n = /[%+]/.test(e), !n) return;
  }
  const i = {};
  n ?? (n = /[%+]/.test(e));
  let a = e.indexOf("?", 8);
  for (; a !== -1; ) {
    const l = e.indexOf("&", a + 1);
    let o = e.indexOf("=", a);
    o > l && l !== -1 && (o = -1);
    let c = e.slice(a + 1, o === -1 ? l === -1 ? void 0 : l : o);
    if (n && (c = ht(c)), a = l, c === "") continue;
    let d;
    o === -1 ? d = "" : (d = e.slice(o + 1, l === -1 ? void 0 : l), n && (d = ht(d))), r ? (i[c] && Array.isArray(i[c]) || (i[c] = []), i[c].push(d)) : i[c] ?? (i[c] = d);
  }
  return t ? i[t] : i;
}, "br");
var xn = br;
var yn = /* @__PURE__ */ __name((e, t) => br(e, t, true), "yn");
var wr = decodeURIComponent;
var Ft = /* @__PURE__ */ __name((e) => jt(e, wr), "Ft");
var xe;
var I;
var V;
var Er;
var Sr;
var wt;
var Q;
var Yt;
var kr = (Yt = class {
  static {
    __name(this, "Yt");
  }
  constructor(e, t = "/", r = [[]]) {
    k(this, V);
    v(this, "raw");
    k(this, xe);
    k(this, I);
    v(this, "routeIndex", 0);
    v(this, "path");
    v(this, "bodyCache", {});
    k(this, Q, (e2) => {
      const { bodyCache: t2, raw: r2 } = this, n = t2[e2];
      if (n) return n;
      const i = Object.keys(t2)[0];
      return i ? t2[i].then((a) => (i === "json" && (a = JSON.stringify(a)), new Response(a)[e2]())) : t2[e2] = r2[e2]();
    });
    this.raw = e, this.path = t, b(this, I, r), b(this, xe, {});
  }
  param(e) {
    return e ? R(this, V, Er).call(this, e) : R(this, V, Sr).call(this);
  }
  query(e) {
    return xn(this.url, e);
  }
  queries(e) {
    return yn(this.url, e);
  }
  header(e) {
    if (e) return this.raw.headers.get(e) ?? void 0;
    const t = {};
    return this.raw.headers.forEach((r, n) => {
      t[n] = r;
    }), t;
  }
  async parseBody(e) {
    var t;
    return (t = this.bodyCache).parsedBody ?? (t.parsedBody = await ln(this, e));
  }
  json() {
    return f(this, Q).call(this, "text").then((e) => JSON.parse(e));
  }
  text() {
    return f(this, Q).call(this, "text");
  }
  arrayBuffer() {
    return f(this, Q).call(this, "arrayBuffer");
  }
  blob() {
    return f(this, Q).call(this, "blob");
  }
  formData() {
    return f(this, Q).call(this, "formData");
  }
  addValidatedData(e, t) {
    f(this, xe)[e] = t;
  }
  valid(e) {
    return f(this, xe)[e];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [an]() {
    return f(this, I);
  }
  get matchedRoutes() {
    return f(this, I)[0].map(([[, e]]) => e);
  }
  get routePath() {
    return f(this, I)[0].map(([[, e]]) => e)[this.routeIndex].path;
  }
}, xe = /* @__PURE__ */ new WeakMap(), I = /* @__PURE__ */ new WeakMap(), V = /* @__PURE__ */ new WeakSet(), Er = /* @__PURE__ */ __name(function(e) {
  const t = f(this, I)[0][this.routeIndex][1][e], r = R(this, V, wt).call(this, t);
  return r && /\%/.test(r) ? Ft(r) : r;
}, "Er"), Sr = /* @__PURE__ */ __name(function() {
  const e = {}, t = Object.keys(f(this, I)[0][this.routeIndex][1]);
  for (const r of t) {
    const n = R(this, V, wt).call(this, f(this, I)[0][this.routeIndex][1][r]);
    n !== void 0 && (e[r] = /\%/.test(n) ? Ft(n) : n);
  }
  return e;
}, "Sr"), wt = /* @__PURE__ */ __name(function(e) {
  return f(this, I)[1] ? f(this, I)[1][e] : e;
}, "wt"), Q = /* @__PURE__ */ new WeakMap(), Yt);
var bn = "text/plain; charset=UTF-8";
var ut = /* @__PURE__ */ __name((e, t) => ({ "Content-Type": e, ...t }), "ut");
var he = /* @__PURE__ */ __name((e, t) => new Response(e, t), "he");
var Ne;
var Be;
var q;
var ye;
var U;
var $;
var He;
var be;
var we;
var ne;
var ze;
var _e;
var H;
var ge;
var kt;
var er;
var wn = (er = class {
  static {
    __name(this, "er");
  }
  constructor(e, t) {
    k(this, H);
    k(this, Ne);
    k(this, Be);
    v(this, "env", {});
    k(this, q);
    v(this, "finalized", false);
    v(this, "error");
    k(this, ye);
    k(this, U);
    k(this, $);
    k(this, He);
    k(this, be);
    k(this, we);
    k(this, ne);
    k(this, ze);
    k(this, _e);
    v(this, "render", (...e2) => (f(this, be) ?? b(this, be, (t2) => this.html(t2)), f(this, be).call(this, ...e2)));
    v(this, "setLayout", (e2) => b(this, He, e2));
    v(this, "getLayout", () => f(this, He));
    v(this, "setRenderer", (e2) => {
      b(this, be, e2);
    });
    v(this, "header", (e2, t2, r) => {
      this.finalized && b(this, $, he(f(this, $).body, f(this, $)));
      const n = f(this, $) ? f(this, $).headers : f(this, ne) ?? b(this, ne, new Headers());
      t2 === void 0 ? n.delete(e2) : r != null && r.append ? n.append(e2, t2) : n.set(e2, t2);
    });
    v(this, "status", (e2) => {
      b(this, ye, e2);
    });
    v(this, "set", (e2, t2) => {
      f(this, q) ?? b(this, q, /* @__PURE__ */ new Map()), f(this, q).set(e2, t2);
    });
    v(this, "get", (e2) => f(this, q) ? f(this, q).get(e2) : void 0);
    v(this, "newResponse", (...e2) => R(this, H, ge).call(this, ...e2));
    v(this, "body", (e2, t2, r) => R(this, H, ge).call(this, e2, t2, r));
    v(this, "text", (e2, t2, r) => R(this, H, kt).call(this) && !t2 && !r ? he(e2) : R(this, H, ge).call(this, e2, t2, ut(bn, r)));
    v(this, "json", (e2, t2, r) => R(this, H, kt).call(this) && !t2 && !r ? Response.json(e2) : R(this, H, ge).call(this, JSON.stringify(e2), t2, ut("application/json", r)));
    v(this, "html", (e2, t2, r) => {
      const n = /* @__PURE__ */ __name((i) => R(this, H, ge).call(this, i, t2, ut("text/html; charset=UTF-8", r)), "n");
      return typeof e2 == "object" ? or(e2, ir.Stringify, false, {}).then(n) : n(e2);
    });
    v(this, "redirect", (e2, t2) => {
      const r = String(e2);
      return this.header("Location", /[^\x00-\xFF]/.test(r) ? encodeURI(r) : r), this.newResponse(null, t2 ?? 302);
    });
    v(this, "notFound", () => (f(this, we) ?? b(this, we, () => he()), f(this, we).call(this, this)));
    b(this, Ne, e), t && (b(this, U, t.executionCtx), this.env = t.env, b(this, we, t.notFoundHandler), b(this, _e, t.path), b(this, ze, t.matchResult));
  }
  get req() {
    return f(this, Be) ?? b(this, Be, new kr(f(this, Ne), f(this, _e), f(this, ze))), f(this, Be);
  }
  get event() {
    if (f(this, U) && "respondWith" in f(this, U)) return f(this, U);
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (f(this, U)) return f(this, U);
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return f(this, $) || b(this, $, he(null, { headers: f(this, ne) ?? b(this, ne, new Headers()) }));
  }
  set res(e) {
    if (f(this, $) && e) {
      e = he(e.body, e);
      for (const [t, r] of f(this, $).headers.entries()) if (t !== "content-type") if (t === "set-cookie") {
        const n = f(this, $).headers.getSetCookie();
        e.headers.delete("set-cookie");
        for (const i of n) e.headers.append("set-cookie", i);
      } else e.headers.set(t, r);
    }
    b(this, $, e), this.finalized = true;
  }
  get var() {
    return f(this, q) ? Object.fromEntries(f(this, q)) : {};
  }
}, Ne = /* @__PURE__ */ new WeakMap(), Be = /* @__PURE__ */ new WeakMap(), q = /* @__PURE__ */ new WeakMap(), ye = /* @__PURE__ */ new WeakMap(), U = /* @__PURE__ */ new WeakMap(), $ = /* @__PURE__ */ new WeakMap(), He = /* @__PURE__ */ new WeakMap(), be = /* @__PURE__ */ new WeakMap(), we = /* @__PURE__ */ new WeakMap(), ne = /* @__PURE__ */ new WeakMap(), ze = /* @__PURE__ */ new WeakMap(), _e = /* @__PURE__ */ new WeakMap(), H = /* @__PURE__ */ new WeakSet(), ge = /* @__PURE__ */ __name(function(e, t, r) {
  const n = f(this, $) ? new Headers(f(this, $).headers) : f(this, ne) ?? new Headers();
  if (typeof t == "object" && "headers" in t) {
    const a = t.headers instanceof Headers ? t.headers : new Headers(t.headers);
    for (const [l, o] of a) l.toLowerCase() === "set-cookie" ? n.append(l, o) : n.set(l, o);
  }
  if (r) for (const [a, l] of Object.entries(r)) if (typeof l == "string") n.set(a, l);
  else {
    n.delete(a);
    for (const o of l) n.append(a, o);
  }
  const i = typeof t == "number" ? t : (t == null ? void 0 : t.status) ?? f(this, ye);
  return he(e, { status: i, headers: n });
}, "ge"), kt = /* @__PURE__ */ __name(function() {
  return !f(this, ne) && !f(this, ye) && !this.finalized;
}, "kt"), er);
var C = "ALL";
var kn = "all";
var En = ["get", "post", "put", "delete", "options", "patch"];
var Rr = "Can not add a route since the matcher is already built.";
var Pr = class extends Error {
  static {
    __name(this, "Pr");
  }
};
var Sn = "__COMPOSED_HANDLER";
var Rn = /* @__PURE__ */ __name((e) => e.text("404 Not Found", 404), "Rn");
var Gt = /* @__PURE__ */ __name((e, t) => {
  if ("getResponse" in e) {
    const r = e.getResponse();
    return t.newResponse(r.body, r);
  }
  return console.error(e), t.text("Internal Server Error", 500);
}, "Gt");
var D;
var j;
var Ar;
var N;
var te;
var Ze;
var Ye;
var ke;
var Pn = (ke = class {
  static {
    __name(this, "ke");
  }
  constructor(t = {}) {
    k(this, j);
    v(this, "get");
    v(this, "post");
    v(this, "put");
    v(this, "delete");
    v(this, "options");
    v(this, "patch");
    v(this, "all");
    v(this, "on");
    v(this, "use");
    v(this, "router");
    v(this, "getPath");
    v(this, "_basePath", "/");
    k(this, D, "/");
    v(this, "routes", []);
    k(this, N, Rn);
    v(this, "errorHandler", Gt);
    v(this, "onError", (t2) => (this.errorHandler = t2, this));
    v(this, "notFound", (t2) => (b(this, N, t2), this));
    v(this, "fetch", (t2, ...r) => R(this, j, Ye).call(this, t2, r[1], r[0], t2.method));
    v(this, "request", (t2, r, n2, i2) => t2 instanceof Request ? this.fetch(r ? new Request(t2, r) : t2, n2, i2) : (t2 = t2.toString(), this.fetch(new Request(/^https?:\/\//.test(t2) ? t2 : `http://localhost${me("/", t2)}`, r), n2, i2)));
    v(this, "fire", () => {
      addEventListener("fetch", (t2) => {
        t2.respondWith(R(this, j, Ye).call(this, t2.request, t2, void 0, t2.request.method));
      });
    });
    [...En, kn].forEach((a) => {
      this[a] = (l, ...o) => (typeof l == "string" ? b(this, D, l) : R(this, j, te).call(this, a, f(this, D), l), o.forEach((c) => {
        R(this, j, te).call(this, a, f(this, D), c);
      }), this);
    }), this.on = (a, l, ...o) => {
      for (const c of [l].flat()) {
        b(this, D, c);
        for (const d of [a].flat()) o.map((h) => {
          R(this, j, te).call(this, d.toUpperCase(), f(this, D), h);
        });
      }
      return this;
    }, this.use = (a, ...l) => (typeof a == "string" ? b(this, D, a) : (b(this, D, "*"), l.unshift(a)), l.forEach((o) => {
      R(this, j, te).call(this, C, f(this, D), o);
    }), this);
    const { strict: n, ...i } = t;
    Object.assign(this, i), this.getPath = n ?? true ? t.getPath ?? xr : vn;
  }
  route(t, r) {
    const n = this.basePath(t);
    return r.routes.map((i) => {
      var l;
      let a;
      r.errorHandler === Gt ? a = i.handler : (a = /* @__PURE__ */ __name(async (o, c) => (await _t([], r.errorHandler)(o, () => i.handler(o, c))).res, "a"), a[Sn] = i.handler), R(l = n, j, te).call(l, i.method, i.path, a);
    }), this;
  }
  basePath(t) {
    const r = R(this, j, Ar).call(this);
    return r._basePath = me(this._basePath, t), r;
  }
  mount(t, r, n) {
    let i, a;
    n && (typeof n == "function" ? a = n : (a = n.optionHandler, n.replaceRequest === false ? i = /* @__PURE__ */ __name((c) => c, "i") : i = n.replaceRequest));
    const l = a ? (c) => {
      const d = a(c);
      return Array.isArray(d) ? d : [d];
    } : (c) => {
      let d;
      try {
        d = c.executionCtx;
      } catch {
      }
      return [c.env, d];
    };
    i || (i = (() => {
      const c = me(this._basePath, t), d = c === "/" ? 0 : c.length;
      return (h) => {
        const u = new URL(h.url);
        return u.pathname = u.pathname.slice(d) || "/", new Request(u, h);
      };
    })());
    const o = /* @__PURE__ */ __name(async (c, d) => {
      const h = await r(i(c.req.raw), ...l(c));
      if (h) return h;
      await d();
    }, "o");
    return R(this, j, te).call(this, C, me(t, "*"), o), this;
  }
}, D = /* @__PURE__ */ new WeakMap(), j = /* @__PURE__ */ new WeakSet(), Ar = /* @__PURE__ */ __name(function() {
  const t = new ke({ router: this.router, getPath: this.getPath });
  return t.errorHandler = this.errorHandler, b(t, N, f(this, N)), t.routes = this.routes, t;
}, "Ar"), N = /* @__PURE__ */ new WeakMap(), te = /* @__PURE__ */ __name(function(t, r, n) {
  t = t.toUpperCase(), r = me(this._basePath, r);
  const i = { basePath: this._basePath, path: r, method: t, handler: n };
  this.router.add(t, r, [n, i]), this.routes.push(i);
}, "te"), Ze = /* @__PURE__ */ __name(function(t, r) {
  if (t instanceof Error) return this.errorHandler(t, r);
  throw t;
}, "Ze"), Ye = /* @__PURE__ */ __name(function(t, r, n, i) {
  if (i === "HEAD") return (async () => new Response(null, await R(this, j, Ye).call(this, t, r, n, "GET")))();
  const a = this.getPath(t, { env: n }), l = this.router.match(i, a), o = new wn(t, { path: a, matchResult: l, env: n, executionCtx: r, notFoundHandler: f(this, N) });
  if (l[0].length === 1) {
    let d;
    try {
      d = l[0][0][0][0](o, async () => {
        o.res = await f(this, N).call(this, o);
      });
    } catch (h) {
      return R(this, j, Ze).call(this, h, o);
    }
    return d instanceof Promise ? d.then((h) => h || (o.finalized ? o.res : f(this, N).call(this, o))).catch((h) => R(this, j, Ze).call(this, h, o)) : d ?? f(this, N).call(this, o);
  }
  const c = _t(l[0], this.errorHandler, f(this, N));
  return (async () => {
    try {
      const d = await c(o);
      if (!d.finalized) throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return d.res;
    } catch (d) {
      return R(this, j, Ze).call(this, d, o);
    }
  })();
}, "Ye"), ke);
var Cr = [];
function An(e, t) {
  const r = this.buildAllMatchers(), n = /* @__PURE__ */ __name(((i, a) => {
    const l = r[i] || r[C], o = l[2][a];
    if (o) return o;
    const c = a.match(l[0]);
    if (!c) return [[], Cr];
    const d = c.indexOf("", 1);
    return [l[1][d], c];
  }), "n");
  return this.match = n, n(e, t);
}
__name(An, "An");
var it = "[^/]+";
var Oe = ".*";
var $e = "(?:|/.*)";
var ve = /* @__PURE__ */ Symbol();
var Cn = new Set(".\\+*[^]$()");
function jn(e, t) {
  return e.length === 1 ? t.length === 1 ? e < t ? -1 : 1 : -1 : t.length === 1 || e === Oe || e === $e ? 1 : t === Oe || t === $e ? -1 : e === it ? 1 : t === it ? -1 : e.length === t.length ? e < t ? -1 : 1 : t.length - e.length;
}
__name(jn, "jn");
var se;
var ie;
var B;
var oe;
var Ln = (oe = class {
  static {
    __name(this, "oe");
  }
  constructor() {
    k(this, se);
    k(this, ie);
    k(this, B, /* @__PURE__ */ Object.create(null));
  }
  insert(t, r, n, i, a) {
    if (t.length === 0) {
      if (f(this, se) !== void 0) throw ve;
      if (a) return;
      b(this, se, r);
      return;
    }
    const [l, ...o] = t, c = l === "*" ? o.length === 0 ? ["", "", Oe] : ["", "", it] : l === "/*" ? ["", "", $e] : l.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let d;
    if (c) {
      const h = c[1];
      let u = c[2] || it;
      if (h && c[2] && (u === ".*" || (u = u.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(u)))) throw ve;
      if (d = f(this, B)[u], !d) {
        if (Object.keys(f(this, B)).some((p) => p !== Oe && p !== $e)) throw ve;
        if (a) return;
        d = f(this, B)[u] = new oe(), h !== "" && b(d, ie, i.varIndex++);
      }
      !a && h !== "" && n.push([h, f(d, ie)]);
    } else if (d = f(this, B)[l], !d) {
      if (Object.keys(f(this, B)).some((h) => h.length > 1 && h !== Oe && h !== $e)) throw ve;
      if (a) return;
      d = f(this, B)[l] = new oe();
    }
    d.insert(o, r, n, i, a);
  }
  buildRegExpStr() {
    const r = Object.keys(f(this, B)).sort(jn).map((n) => {
      const i = f(this, B)[n];
      return (typeof f(i, ie) == "number" ? `(${n})@${f(i, ie)}` : Cn.has(n) ? `\\${n}` : n) + i.buildRegExpStr();
    });
    return typeof f(this, se) == "number" && r.unshift(`#${f(this, se)}`), r.length === 0 ? "" : r.length === 1 ? r[0] : "(?:" + r.join("|") + ")";
  }
}, se = /* @__PURE__ */ new WeakMap(), ie = /* @__PURE__ */ new WeakMap(), B = /* @__PURE__ */ new WeakMap(), oe);
var at;
var Fe;
var tr;
var Mn = (tr = class {
  static {
    __name(this, "tr");
  }
  constructor() {
    k(this, at, { varIndex: 0 });
    k(this, Fe, new Ln());
  }
  insert(e, t, r) {
    const n = [], i = [];
    for (let l = 0; ; ) {
      let o = false;
      if (e = e.replace(/\{[^}]+\}/g, (c) => {
        const d = `@\\${l}`;
        return i[l] = [d, c], l++, o = true, d;
      }), !o) break;
    }
    const a = e.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let l = i.length - 1; l >= 0; l--) {
      const [o] = i[l];
      for (let c = a.length - 1; c >= 0; c--) if (a[c].indexOf(o) !== -1) {
        a[c] = a[c].replace(o, i[l][1]);
        break;
      }
    }
    return f(this, Fe).insert(a, t, n, f(this, at), r), n;
  }
  buildRegExp() {
    let e = f(this, Fe).buildRegExpStr();
    if (e === "") return [/^$/, [], []];
    let t = 0;
    const r = [], n = [];
    return e = e.replace(/#(\d+)|@(\d+)|\.\*\$/g, (i, a, l) => a !== void 0 ? (r[++t] = Number(a), "$()") : (l !== void 0 && (n[Number(l)] = ++t), "")), [new RegExp(`^${e}`), r, n];
  }
}, at = /* @__PURE__ */ new WeakMap(), Fe = /* @__PURE__ */ new WeakMap(), tr);
var On = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var et = /* @__PURE__ */ Object.create(null);
function jr(e) {
  return et[e] ?? (et[e] = new RegExp(e === "*" ? "" : `^${e.replace(/\/\*$|([.\\+*[^\]$()])/g, (t, r) => r ? `\\${r}` : "(?:|/.*)")}$`));
}
__name(jr, "jr");
function $n() {
  et = /* @__PURE__ */ Object.create(null);
}
__name($n, "$n");
function In(e) {
  var d;
  const t = new Mn(), r = [];
  if (e.length === 0) return On;
  const n = e.map((h) => [!/\*|\/:/.test(h[0]), ...h]).sort(([h, u], [p, m]) => h ? 1 : p ? -1 : u.length - m.length), i = /* @__PURE__ */ Object.create(null);
  for (let h = 0, u = -1, p = n.length; h < p; h++) {
    const [m, g, x] = n[h];
    m ? i[g] = [x.map(([E]) => [E, /* @__PURE__ */ Object.create(null)]), Cr] : u++;
    let w;
    try {
      w = t.insert(g, u, m);
    } catch (E) {
      throw E === ve ? new Pr(g) : E;
    }
    m || (r[u] = x.map(([E, y]) => {
      const S = /* @__PURE__ */ Object.create(null);
      for (y -= 1; y >= 0; y--) {
        const [P, M] = w[y];
        S[P] = M;
      }
      return [E, S];
    }));
  }
  const [a, l, o] = t.buildRegExp();
  for (let h = 0, u = r.length; h < u; h++) for (let p = 0, m = r[h].length; p < m; p++) {
    const g = (d = r[h][p]) == null ? void 0 : d[1];
    if (!g) continue;
    const x = Object.keys(g);
    for (let w = 0, E = x.length; w < E; w++) g[x[w]] = o[g[x[w]]];
  }
  const c = [];
  for (const h in l) c[h] = r[l[h]];
  return [a, c, i];
}
__name(In, "In");
function ue(e, t) {
  if (e) {
    for (const r of Object.keys(e).sort((n, i) => i.length - n.length)) if (jr(r).test(t)) return [...e[r]];
  }
}
__name(ue, "ue");
var J;
var X;
var lt;
var Lr;
var rr;
var Tn = (rr = class {
  static {
    __name(this, "rr");
  }
  constructor() {
    k(this, lt);
    v(this, "name", "RegExpRouter");
    k(this, J);
    k(this, X);
    v(this, "match", An);
    b(this, J, { [C]: /* @__PURE__ */ Object.create(null) }), b(this, X, { [C]: /* @__PURE__ */ Object.create(null) });
  }
  add(e, t, r) {
    var o;
    const n = f(this, J), i = f(this, X);
    if (!n || !i) throw new Error(Rr);
    n[e] || [n, i].forEach((c) => {
      c[e] = /* @__PURE__ */ Object.create(null), Object.keys(c[C]).forEach((d) => {
        c[e][d] = [...c[C][d]];
      });
    }), t === "/*" && (t = "*");
    const a = (t.match(/\/:/g) || []).length;
    if (/\*$/.test(t)) {
      const c = jr(t);
      e === C ? Object.keys(n).forEach((d) => {
        var h;
        (h = n[d])[t] || (h[t] = ue(n[d], t) || ue(n[C], t) || []);
      }) : (o = n[e])[t] || (o[t] = ue(n[e], t) || ue(n[C], t) || []), Object.keys(n).forEach((d) => {
        (e === C || e === d) && Object.keys(n[d]).forEach((h) => {
          c.test(h) && n[d][h].push([r, a]);
        });
      }), Object.keys(i).forEach((d) => {
        (e === C || e === d) && Object.keys(i[d]).forEach((h) => c.test(h) && i[d][h].push([r, a]));
      });
      return;
    }
    const l = yr(t) || [t];
    for (let c = 0, d = l.length; c < d; c++) {
      const h = l[c];
      Object.keys(i).forEach((u) => {
        var p;
        (e === C || e === u) && ((p = i[u])[h] || (p[h] = [...ue(n[u], h) || ue(n[C], h) || []]), i[u][h].push([r, a - d + c + 1]));
      });
    }
  }
  buildAllMatchers() {
    const e = /* @__PURE__ */ Object.create(null);
    return Object.keys(f(this, X)).concat(Object.keys(f(this, J))).forEach((t) => {
      e[t] || (e[t] = R(this, lt, Lr).call(this, t));
    }), b(this, J, b(this, X, void 0)), $n(), e;
  }
}, J = /* @__PURE__ */ new WeakMap(), X = /* @__PURE__ */ new WeakMap(), lt = /* @__PURE__ */ new WeakSet(), Lr = /* @__PURE__ */ __name(function(e) {
  const t = [];
  let r = e === C;
  return [f(this, J), f(this, X)].forEach((n) => {
    const i = n[e] ? Object.keys(n[e]).map((a) => [a, n[e][a]]) : [];
    i.length !== 0 ? (r || (r = true), t.push(...i)) : e !== C && t.push(...Object.keys(n[C]).map((a) => [a, n[C][a]]));
  }), r ? In(t) : null;
}, "Lr"), rr);
var Z;
var K;
var nr;
var Dn = (nr = class {
  static {
    __name(this, "nr");
  }
  constructor(e) {
    v(this, "name", "SmartRouter");
    k(this, Z, []);
    k(this, K, []);
    b(this, Z, e.routers);
  }
  add(e, t, r) {
    if (!f(this, K)) throw new Error(Rr);
    f(this, K).push([e, t, r]);
  }
  match(e, t) {
    if (!f(this, K)) throw new Error("Fatal error");
    const r = f(this, Z), n = f(this, K), i = r.length;
    let a = 0, l;
    for (; a < i; a++) {
      const o = r[a];
      try {
        for (let c = 0, d = n.length; c < d; c++) o.add(...n[c]);
        l = o.match(e, t);
      } catch (c) {
        if (c instanceof Pr) continue;
        throw c;
      }
      this.match = o.match.bind(o), b(this, Z, [o]), b(this, K, void 0);
      break;
    }
    if (a === i) throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, l;
  }
  get activeRouter() {
    if (f(this, K) || f(this, Z).length !== 1) throw new Error("No active router has been determined yet.");
    return f(this, Z)[0];
  }
}, Z = /* @__PURE__ */ new WeakMap(), K = /* @__PURE__ */ new WeakMap(), nr);
var Le = /* @__PURE__ */ Object.create(null);
var Nn = /* @__PURE__ */ __name((e) => {
  for (const t in e) return true;
  return false;
}, "Nn");
var Y;
var O;
var ae;
var Ee;
var L;
var W;
var re;
var Se;
var Bn = (Se = class {
  static {
    __name(this, "Se");
  }
  constructor(t, r, n) {
    k(this, W);
    k(this, Y);
    k(this, O);
    k(this, ae);
    k(this, Ee, 0);
    k(this, L, Le);
    if (b(this, O, n || /* @__PURE__ */ Object.create(null)), b(this, Y, []), t && r) {
      const i = /* @__PURE__ */ Object.create(null);
      i[t] = { handler: r, possibleKeys: [], score: 0 }, b(this, Y, [i]);
    }
    b(this, ae, []);
  }
  insert(t, r, n) {
    b(this, Ee, ++Tt(this, Ee)._);
    let i = this;
    const a = hn(r), l = [];
    for (let o = 0, c = a.length; o < c; o++) {
      const d = a[o], h = a[o + 1], u = mn(d, h), p = Array.isArray(u) ? u[0] : d;
      if (p in f(i, O)) {
        i = f(i, O)[p], u && l.push(u[1]);
        continue;
      }
      f(i, O)[p] = new Se(), u && (f(i, ae).push(u), l.push(u[1])), i = f(i, O)[p];
    }
    return f(i, Y).push({ [t]: { handler: n, possibleKeys: l.filter((o, c, d) => d.indexOf(o) === c), score: f(this, Ee) } }), i;
  }
  search(t, r) {
    var h;
    const n = [];
    b(this, L, Le);
    let a = [this];
    const l = vr(r), o = [], c = l.length;
    let d = null;
    for (let u = 0; u < c; u++) {
      const p = l[u], m = u === c - 1, g = [];
      for (let w = 0, E = a.length; w < E; w++) {
        const y = a[w], S = f(y, O)[p];
        S && (b(S, L, f(y, L)), m ? (f(S, O)["*"] && R(this, W, re).call(this, n, f(S, O)["*"], t, f(y, L)), R(this, W, re).call(this, n, S, t, f(y, L))) : g.push(S));
        for (let P = 0, M = f(y, ae).length; P < M; P++) {
          const ce = f(y, ae)[P], _ = f(y, L) === Le ? {} : { ...f(y, L) };
          if (ce === "*") {
            const de = f(y, O)["*"];
            de && (R(this, W, re).call(this, n, de, t, f(y, L)), b(de, L, _), g.push(de));
            continue;
          }
          const [_r, $t, Ce] = ce;
          if (!p && !(Ce instanceof RegExp)) continue;
          const F = f(y, O)[_r];
          if (Ce instanceof RegExp) {
            if (d === null) {
              d = new Array(c);
              let fe = r[0] === "/" ? 1 : 0;
              for (let je = 0; je < c; je++) d[je] = fe, fe += l[je].length + 1;
            }
            const de = r.substring(d[u]), ot = Ce.exec(de);
            if (ot) {
              if (_[$t] = ot[0], R(this, W, re).call(this, n, F, t, f(y, L), _), Nn(f(F, O))) {
                b(F, L, _);
                const fe = ((h = ot[0].match(/\//)) == null ? void 0 : h.length) ?? 0;
                (o[fe] || (o[fe] = [])).push(F);
              }
              continue;
            }
          }
          (Ce === true || Ce.test(p)) && (_[$t] = p, m ? (R(this, W, re).call(this, n, F, t, _, f(y, L)), f(F, O)["*"] && R(this, W, re).call(this, n, f(F, O)["*"], t, _, f(y, L))) : (b(F, L, _), g.push(F)));
        }
      }
      const x = o.shift();
      a = x ? g.concat(x) : g;
    }
    return n.length > 1 && n.sort((u, p) => u.score - p.score), [n.map(({ handler: u, params: p }) => [u, p])];
  }
}, Y = /* @__PURE__ */ new WeakMap(), O = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakMap(), Ee = /* @__PURE__ */ new WeakMap(), L = /* @__PURE__ */ new WeakMap(), W = /* @__PURE__ */ new WeakSet(), re = /* @__PURE__ */ __name(function(t, r, n, i, a) {
  for (let l = 0, o = f(r, Y).length; l < o; l++) {
    const c = f(r, Y)[l], d = c[n] || c[C], h = {};
    if (d !== void 0 && (d.params = /* @__PURE__ */ Object.create(null), t.push(d), i !== Le || a && a !== Le)) for (let u = 0, p = d.possibleKeys.length; u < p; u++) {
      const m = d.possibleKeys[u], g = h[d.score];
      d.params[m] = a != null && a[m] && !g ? a[m] : i[m] ?? (a == null ? void 0 : a[m]), h[d.score] = true;
    }
  }
}, "re"), Se);
var le;
var sr;
var Hn = (sr = class {
  static {
    __name(this, "sr");
  }
  constructor() {
    v(this, "name", "TrieRouter");
    k(this, le);
    b(this, le, new Bn());
  }
  add(e, t, r) {
    const n = yr(t);
    if (n) {
      for (let i = 0, a = n.length; i < a; i++) f(this, le).insert(e, n[i], r);
      return;
    }
    f(this, le).insert(e, t, r);
  }
  match(e, t) {
    return f(this, le).search(e, t);
  }
}, le = /* @__PURE__ */ new WeakMap(), sr);
var Mr = class extends Pn {
  static {
    __name(this, "Mr");
  }
  constructor(e = {}) {
    super(e), this.router = e.router ?? new Dn({ routers: [new Tn(), new Hn()] });
  }
};
var Te = "_hp";
var zn = { Change: "Input", DoubleClick: "DblClick" };
var _n = { svg: "2000/svg", math: "1998/Math/MathML" };
var De = [];
var Et = /* @__PURE__ */ new WeakMap();
var Pe = void 0;
var Fn = /* @__PURE__ */ __name(() => Pe, "Fn");
var G = /* @__PURE__ */ __name((e) => "t" in e, "G");
var pt = { onClick: ["click", false] };
var qt = /* @__PURE__ */ __name((e) => {
  if (!e.startsWith("on")) return;
  if (pt[e]) return pt[e];
  const t = e.match(/^on([A-Z][a-zA-Z]+?(?:PointerCapture)?)(Capture)?$/);
  if (t) {
    const [, r, n] = t;
    return pt[e] = [(zn[r] || r).toLowerCase(), !!n];
  }
}, "qt");
var Ut = /* @__PURE__ */ __name((e, t) => Pe && e instanceof SVGElement && /[A-Z]/.test(t) && (t in e.style || t.match(/^(?:o|pai|str|u|ve)/)) ? t.replace(/([A-Z])/g, "-$1").toLowerCase() : t, "Ut");
var Gn = /* @__PURE__ */ __name((e, t, r) => {
  var n;
  t || (t = {});
  for (let i in t) {
    const a = t[i];
    if (i !== "children" && (!r || r[i] !== a)) {
      i = st(i);
      const l = qt(i);
      if (l) {
        if ((r == null ? void 0 : r[i]) !== a && (r && e.removeEventListener(l[0], r[i], l[1]), a != null)) {
          if (typeof a != "function") throw new Error(`Event handler for "${i}" is not a function`);
          e.addEventListener(l[0], a, l[1]);
        }
      } else if (i === "dangerouslySetInnerHTML" && a) e.innerHTML = a.__html;
      else if (i === "ref") {
        let o;
        typeof a == "function" ? o = a(e) || (() => a(null)) : a && "current" in a && (a.current = e, o = /* @__PURE__ */ __name(() => a.current = null, "o")), Et.set(e, o);
      } else if (i === "style") {
        const o = e.style;
        typeof a == "string" ? o.cssText = a : (o.cssText = "", a != null && pr(a, o.setProperty.bind(o)));
      } else {
        if (i === "value") {
          const c = e.nodeName;
          if (c === "INPUT" || c === "TEXTAREA" || c === "SELECT") {
            if (e.value = a == null || a === false ? null : a, c === "TEXTAREA") {
              e.textContent = a;
              continue;
            } else if (c === "SELECT") {
              e.selectedIndex === -1 && (e.selectedIndex = 0);
              continue;
            }
          }
        } else (i === "checked" && e.nodeName === "INPUT" || i === "selected" && e.nodeName === "OPTION") && (e[i] = a);
        const o = Ut(e, i);
        a == null || a === false ? e.removeAttribute(o) : a === true ? e.setAttribute(o, "") : typeof a == "string" || typeof a == "number" ? e.setAttribute(o, a) : e.setAttribute(o, a.toString());
      }
    }
  }
  if (r) for (let i in r) {
    const a = r[i];
    if (i !== "children" && !(i in t)) {
      i = st(i);
      const l = qt(i);
      l ? e.removeEventListener(l[0], a, l[1]) : i === "ref" ? (n = Et.get(e)) == null || n() : e.removeAttribute(Ut(e, i));
    }
  }
}, "Gn");
var qn = /* @__PURE__ */ __name((e, t) => {
  t[A][0] = 0, De.push([e, t]);
  const r = t.tag[Rt] || t.tag, n = r.defaultProps ? { ...r.defaultProps, ...t.props } : t.props;
  try {
    return [r.call(null, n)];
  } finally {
    De.pop();
  }
}, "qn");
var Or = /* @__PURE__ */ __name((e, t, r, n, i) => {
  var a, l;
  (a = e.vR) != null && a.length && (n.push(...e.vR), delete e.vR), typeof e.tag == "function" && ((l = e[A][1][Dr]) == null || l.forEach((o) => i.push(o))), e.vC.forEach((o) => {
    var c;
    if (G(o)) r.push(o);
    else if (typeof o.tag == "function" || o.tag === "") {
      o.c = t;
      const d = r.length;
      if (Or(o, t, r, n, i), o.s) {
        for (let h = d; h < r.length; h++) r[h].s = true;
        o.s = false;
      }
    } else r.push(o), (c = o.vR) != null && c.length && (n.push(...o.vR), delete o.vR);
  });
}, "Or");
var Un = /* @__PURE__ */ __name((e) => {
  var t;
  for (; e && (e.tag === Te || !e.e); ) e = e.tag === Te || !((t = e.vC) != null && t[0]) ? e.nN : e.vC[0];
  return e == null ? void 0 : e.e;
}, "Un");
var $r = /* @__PURE__ */ __name((e) => {
  var t, r, n, i, a, l;
  G(e) || ((r = (t = e[A]) == null ? void 0 : t[1][Dr]) == null || r.forEach((o) => {
    var c;
    return (c = o[2]) == null ? void 0 : c.call(o);
  }), (n = Et.get(e.e)) == null || n(), e.p === 2 && ((i = e.vC) == null || i.forEach((o) => o.p = 2)), (a = e.vC) == null || a.forEach($r)), e.p || ((l = e.e) == null || l.remove(), delete e.e), typeof e.tag == "function" && (Me.delete(e), tt.delete(e), delete e[A][3], e.a = true);
}, "$r");
var Ir = /* @__PURE__ */ __name((e, t, r) => {
  e.c = t, Tr(e, t, r);
}, "Ir");
var Kt = /* @__PURE__ */ __name((e, t) => {
  if (t) {
    for (let r = 0, n = e.length; r < n; r++) if (e[r] === t) return r;
  }
}, "Kt");
var Wt = /* @__PURE__ */ Symbol();
var Tr = /* @__PURE__ */ __name((e, t, r) => {
  var d;
  const n = [], i = [], a = [];
  Or(e, t, n, i, a), i.forEach($r);
  const l = r ? void 0 : t.childNodes;
  let o, c = null;
  if (r) o = -1;
  else if (!l.length) o = 0;
  else {
    const h = Kt(l, Un(e.nN));
    h !== void 0 ? (c = l[h], o = h) : o = Kt(l, (d = n.find((u) => u.tag !== Te && u.e)) == null ? void 0 : d.e) ?? -1, o === -1 && (r = true);
  }
  for (let h = 0, u = n.length; h < u; h++, o++) {
    const p = n[h];
    let m;
    if (p.s && p.e) m = p.e, p.s = false;
    else {
      const g = r || !p.e;
      G(p) ? (p.e && p.d && (p.e.textContent = p.t), p.d = false, m = p.e || (p.e = document.createTextNode(p.t))) : (m = p.e || (p.e = p.n ? document.createElementNS(p.n, p.tag) : document.createElement(p.tag)), Gn(m, p.props, p.pP), Tr(p, m, g));
    }
    p.tag === Te ? o-- : r ? m.parentNode || t.appendChild(m) : l[o] !== m && l[o - 1] !== m && (l[o + 1] === m ? t.appendChild(l[o]) : t.insertBefore(m, c || l[o] || null));
  }
  if (e.pP && (e.pP = void 0), a.length) {
    const h = [], u = [];
    a.forEach(([, p, , m, g]) => {
      p && h.push(p), m && u.push(m), g == null || g();
    }), h.forEach((p) => p()), u.length && requestAnimationFrame(() => {
      u.forEach((p) => p());
    });
  }
}, "Tr");
var Kn = /* @__PURE__ */ __name((e, t) => !!(e && e.length === t.length && e.every((r, n) => r[1] === t[n][1])), "Kn");
var tt = /* @__PURE__ */ new WeakMap();
var St = /* @__PURE__ */ __name((e, t, r) => {
  var a, l, o, c, d, h;
  const n = !r && t.pC;
  r && (t.pC || (t.pC = t.vC));
  let i;
  try {
    r || (r = typeof t.tag == "function" ? qn(e, t) : Ge(t.props.children)), ((a = r[0]) == null ? void 0 : a.tag) === "" && r[0][yt] && (i = r[0][yt], e[5].push([e, i, t]));
    const u = n ? [...t.pC] : t.vC ? [...t.vC] : void 0, p = [];
    let m;
    for (let g = 0; g < r.length; g++) {
      if (Array.isArray(r[g])) {
        r.splice(g, 1, ...r[g].flat(1 / 0)), g--;
        continue;
      }
      let x = Wn(r[g]);
      if (x) {
        typeof x.tag == "function" && !x.tag[cr] && (Re.length > 0 && (x[A][2] = Re.map((E) => [E, E.values.at(-1)])), (l = e[5]) != null && l.length && (x[A][3] = e[5].at(-1)));
        let w;
        if (u && u.length) {
          const E = u.findIndex(G(x) ? (y) => G(y) : x.key !== void 0 ? (y) => y.key === x.key && y.tag === x.tag : (y) => y.tag === x.tag);
          E !== -1 && (w = u[E], u.splice(E, 1));
        }
        if (w) if (G(x)) w.t !== x.t && (w.t = x.t, w.d = true), x = w;
        else {
          const E = w.pP = w.props;
          if (w.props = x.props, w.f || (w.f = x.f || t.f), typeof x.tag == "function") {
            const y = w[A][2];
            w[A][2] = x[A][2] || [], w[A][3] = x[A][3], !w.f && ((w.o || w) === x.o || (c = (o = w.tag)[Kr]) != null && c.call(o, E, w.props)) && Kn(y, w[A][2]) && (w.s = true);
          }
          x = w;
        }
        else if (!G(x) && Pe) {
          const E = Ae(Pe);
          E && (x.n = E);
        }
        if (!G(x) && !x.s && (St(e, x), delete x.f), p.push(x), m && !m.s && !x.s) for (let E = m; E && !G(E); E = (d = E.vC) == null ? void 0 : d.at(-1)) E.nN = x;
        m = x;
      }
    }
    t.vR = n ? [...t.vC, ...u || []] : u || [], t.vC = p, n && delete t.pC;
  } catch (u) {
    if (t.f = true, u === Wt) {
      if (i) return;
      throw u;
    }
    const [p, m, g] = ((h = t[A]) == null ? void 0 : h[3]) || [];
    if (m) {
      const x = /* @__PURE__ */ __name(() => rt([0, false, e[2]], g), "x"), w = tt.get(g) || [];
      w.push(x), tt.set(g, w);
      const E = m(u, () => {
        const y = tt.get(g);
        if (y) {
          const S = y.indexOf(x);
          if (S !== -1) return y.splice(S, 1), x();
        }
      });
      if (E) {
        if (e[0] === 1) e[1] = true;
        else if (St(e, g, [E]), (m.length === 1 || e !== p) && g.c) {
          Ir(g, g.c, false);
          return;
        }
        throw Wt;
      }
    }
    throw u;
  } finally {
    i && e[5].pop();
  }
}, "St");
var Wn = /* @__PURE__ */ __name((e) => {
  if (!(e == null || typeof e == "boolean")) {
    if (typeof e == "string" || typeof e == "number") return { t: e.toString(), d: true };
    if ("vR" in e && (e = { tag: e.tag, props: e.props, key: e.key, f: e.f, type: e.tag, ref: e.props.ref, o: e.o || e }), typeof e.tag == "function") e[A] = [0, []];
    else {
      const t = _n[e.tag];
      t && (Pe || (Pe = fr("")), e.props.children = [{ tag: Pe, props: { value: e.n = `http://www.w3.org/${t}`, children: e.props.children } }]);
    }
    return e;
  }
}, "Wn");
var Vt = /* @__PURE__ */ __name((e, t) => {
  var r, n;
  (r = t[A][2]) == null || r.forEach(([i, a]) => {
    i.values.push(a);
  });
  try {
    St(e, t, void 0);
  } catch {
    return;
  }
  if (t.a) {
    delete t.a;
    return;
  }
  (n = t[A][2]) == null || n.forEach(([i]) => {
    i.values.pop();
  }), (e[0] !== 1 || !e[1]) && Ir(t, t.c, false);
}, "Vt");
var Me = /* @__PURE__ */ new WeakMap();
var Qt = [];
var rt = /* @__PURE__ */ __name(async (e, t) => {
  e[5] || (e[5] = []);
  const r = Me.get(t);
  r && r[0](void 0);
  let n;
  const i = new Promise((a) => n = a);
  if (Me.set(t, [n, () => {
    e[2] ? e[2](e, t, (a) => {
      Vt(a, t);
    }).then(() => n(t)) : (Vt(e, t), n(t));
  }]), Qt.length) Qt.at(-1).add(t);
  else {
    await Promise.resolve();
    const a = Me.get(t);
    a && (Me.delete(t), a[1]());
  }
  return i;
}, "rt");
var Vn = /* @__PURE__ */ __name((e, t, r) => ({ tag: Te, props: { children: e }, key: r, e: t, p: 1 }), "Vn");
var mt = 0;
var Dr = 1;
var gt = 2;
var vt = 3;
var xt = /* @__PURE__ */ new WeakMap();
var Nr = /* @__PURE__ */ __name((e, t) => !e || !t || e.length !== t.length || t.some((r, n) => r !== e[n]), "Nr");
var Qn = void 0;
var Jt = [];
var Jn = /* @__PURE__ */ __name((e) => {
  var l;
  const t = /* @__PURE__ */ __name(() => typeof e == "function" ? e() : e, "t"), r = De.at(-1);
  if (!r) return [t(), () => {
  }];
  const [, n] = r, i = (l = n[A][1])[mt] || (l[mt] = []), a = n[A][0]++;
  return i[a] || (i[a] = [t(), (o) => {
    const c = Qn, d = i[a];
    if (typeof o == "function" && (o = o(d[0])), !Object.is(o, d[0])) if (d[0] = o, Jt.length) {
      const [h, u] = Jt.at(-1);
      Promise.all([h === 3 ? n : rt([h, false, c], n), u]).then(([p]) => {
        if (!p || !(h === 2 || h === 3)) return;
        const m = p.vC;
        requestAnimationFrame(() => {
          setTimeout(() => {
            m === p.vC && rt([h === 3 ? 1 : 0, false, c], p);
          });
        });
      });
    } else rt([0, false, c], n);
  }]);
}, "Jn");
var Lt = /* @__PURE__ */ __name((e, t) => {
  var o;
  const r = De.at(-1);
  if (!r) return e;
  const [, n] = r, i = (o = n[A][1])[gt] || (o[gt] = []), a = n[A][0]++, l = i[a];
  return Nr(l == null ? void 0 : l[1], t) ? i[a] = [e, t] : e = i[a][0], e;
}, "Lt");
var Xn = /* @__PURE__ */ __name((e) => {
  const t = xt.get(e);
  if (t) {
    if (t.length === 2) throw t[1];
    return t[0];
  }
  throw e.then((r) => xt.set(e, [r]), (r) => xt.set(e, [void 0, r])), e;
}, "Xn");
var Zn = /* @__PURE__ */ __name((e, t) => {
  var o;
  const r = De.at(-1);
  if (!r) return e();
  const [, n] = r, i = (o = n[A][1])[vt] || (o[vt] = []), a = n[A][0]++, l = i[a];
  return Nr(l == null ? void 0 : l[1], t) && (i[a] = [e(), t]), i[a][0];
}, "Zn");
var Yn = fr({ pending: false, data: null, method: null, action: null });
var Xt = /* @__PURE__ */ new Set();
var es = /* @__PURE__ */ __name((e) => {
  Xt.add(e), e.finally(() => Xt.delete(e));
}, "es");
var Mt = /* @__PURE__ */ __name((e, t) => Zn(() => (r) => {
  let n;
  e && (typeof e == "function" ? n = e(r) || (() => {
    e(null);
  }) : e && "current" in e && (e.current = r, n = /* @__PURE__ */ __name(() => {
    e.current = null;
  }, "n")));
  const i = t(r);
  return () => {
    i == null || i(), n == null || n();
  };
}, [e]), "Mt");
var pe = /* @__PURE__ */ Object.create(null);
var Ve = /* @__PURE__ */ Object.create(null);
var Ke = /* @__PURE__ */ __name((e, t, r, n, i) => {
  if (t != null && t.itemProp) return { tag: e, props: t, type: e, ref: t.ref };
  const a = document.head;
  let { onLoad: l, onError: o, precedence: c, blocking: d, ...h } = t, u = null, p = false;
  const m = Qe[e];
  let g;
  if (m.length > 0) {
    const y = a.querySelectorAll(e);
    e: for (const S of y) for (const P of Qe[e]) if (S.getAttribute(P) === t[P]) {
      u = S;
      break e;
    }
    if (!u) {
      const S = m.reduce((P, M) => t[M] === void 0 ? P : `${P}-${M}-${t[M]}`, e);
      p = !Ve[S], u = Ve[S] || (Ve[S] = (() => {
        const P = document.createElement(e);
        for (const M of m) t[M] !== void 0 && P.setAttribute(M, t[M]), t.rel && P.setAttribute("rel", t.rel);
        return P;
      })());
    }
  } else g = a.querySelectorAll(e);
  c = n ? c ?? "" : void 0, n && (h[Je] = c);
  const x = Lt((y) => {
    if (m.length > 0) {
      let S = false;
      for (const P of a.querySelectorAll(e)) {
        if (S && P.getAttribute(Je) !== c) {
          a.insertBefore(y, P);
          return;
        }
        P.getAttribute(Je) === c && (S = true);
      }
      a.appendChild(y);
    } else if (g) {
      let S = false;
      for (const P of g) if (P === y) {
        S = true;
        break;
      }
      S || a.insertBefore(y, a.contains(g[0]) ? g[0] : a.querySelector(e)), g = void 0;
    }
  }, [c]), w = Mt(t.ref, (y) => {
    var M;
    const S = m[0];
    if (r === 2 && (y.innerHTML = ""), (p || g) && x(y), !o && !l) return;
    let P = pe[M = y.getAttribute(S)] || (pe[M] = new Promise((ce, _) => {
      y.addEventListener("load", ce), y.addEventListener("error", _);
    }));
    l && (P = P.then(l)), o && (P = P.catch(o)), P.catch(() => {
    });
  });
  if (i && d === "render") {
    const y = Qe[e][0];
    if (t[y]) {
      const S = t[y], P = pe[S] || (pe[S] = new Promise((M, ce) => {
        x(u), u.addEventListener("load", M), u.addEventListener("error", ce);
      }));
      Xn(P);
    }
  }
  const E = { tag: e, type: e, props: { ...h, ref: w }, ref: w };
  return E.p = r, u && (E.e = u), Vn(E, a);
}, "Ke");
var ts = /* @__PURE__ */ __name((e) => {
  const t = Fn(), r = t && Ae(t);
  return r != null && r.endsWith("svg") ? { tag: "title", props: e, type: "title", ref: e.ref } : Ke("title", e, void 0, false, false);
}, "ts");
var rs = /* @__PURE__ */ __name((e) => !e || ["src", "async"].some((t) => !e[t]) ? { tag: "script", props: e, type: "script", ref: e.ref } : Ke("script", e, 1, false, true), "rs");
var ns = /* @__PURE__ */ __name((e) => !e || !["href", "precedence"].every((t) => t in e) ? { tag: "style", props: e, type: "style", ref: e.ref } : (e["data-href"] = e.href, delete e.href, Ke("style", e, 2, true, true)), "ns");
var ss = /* @__PURE__ */ __name((e) => !e || ["onLoad", "onError"].some((t) => t in e) || e.rel === "stylesheet" && (!("precedence" in e) || "disabled" in e) ? { tag: "link", props: e, type: "link", ref: e.ref } : Ke("link", e, 1, "precedence" in e, true), "ss");
var is = /* @__PURE__ */ __name((e) => Ke("meta", e, void 0, false, false), "is");
var Br = /* @__PURE__ */ Symbol();
var as = /* @__PURE__ */ __name((e) => {
  const { action: t, ...r } = e;
  typeof t != "function" && (r.action = t);
  const [n, i] = Jn([null, false]), a = Lt(async (d) => {
    const h = d.isTrusted ? t : d.detail[Br];
    if (typeof h != "function") return;
    d.preventDefault();
    const u = new FormData(d.target);
    i([u, true]);
    const p = h(u);
    p instanceof Promise && (es(p), await p), i([null, true]);
  }, []), l = Mt(e.ref, (d) => (d.addEventListener("submit", a), () => {
    d.removeEventListener("submit", a);
  })), [o, c] = n;
  return n[1] = false, { tag: Yn, props: { value: { pending: o !== null, data: o, method: o ? "post" : null, action: o ? t : null }, children: { tag: "form", props: { ...r, ref: l }, type: "form", ref: l } }, f: c };
}, "as");
var Hr = /* @__PURE__ */ __name((e, { formAction: t, ...r }) => {
  if (typeof t == "function") {
    const n = Lt((i) => {
      i.preventDefault(), i.currentTarget.form.dispatchEvent(new CustomEvent("submit", { detail: { [Br]: t } }));
    }, []);
    r.ref = Mt(r.ref, (i) => (i.addEventListener("click", n), () => {
      i.removeEventListener("click", n);
    }));
  }
  return { tag: e, props: r, type: e, ref: r.ref };
}, "Hr");
var ls = /* @__PURE__ */ __name((e) => Hr("input", e), "ls");
var os = /* @__PURE__ */ __name((e) => Hr("button", e), "os");
Object.assign(bt, { title: ts, script: rs, style: ns, link: ss, meta: is, form: as, input: ls, button: os });
Pt(null);
new TextEncoder();
var cs = Pt(null);
var ds = /* @__PURE__ */ __name((e, t, r, n) => (i, a) => {
  const l = "<!DOCTYPE html>", o = r ? Ht((d) => r(d, e), { Layout: t, ...a }, i) : i, c = Ur`${T(l)}${Ht(cs.Provider, { value: e }, o)}`;
  return e.html(c);
}, "ds");
var fs = /* @__PURE__ */ __name((e, t) => function(n, i) {
  const a = n.getLayout() ?? gr;
  return e && n.setLayout((l) => e({ ...l, Layout: a }, n)), n.setRenderer(ds(n, a, e)), i();
}, "fs");
var hs = fs(({ children: e }) => s("html", { lang: "en", children: [s("head", { children: [s("meta", { charset: "UTF-8" }), s("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }), s("title", { children: "Ritik Nipane \u2014 Data Analyst" }), s("meta", { name: "description", content: "Data Analyst specializing in financial, operational, and supply chain risk analysis. Turning complex data into actionable intelligence." }), s("link", { rel: "preconnect", href: "https://fonts.googleapis.com" }), s("link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "anonymous" }), s("link", { href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600&display=swap", rel: "stylesheet" }), s("script", { src: "https://cdn.tailwindcss.com" }), s("script", { src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" }), s("script", { src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" }), s("script", { src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js" }), s("script", { src: "https://cdn.jsdelivr.net/npm/lenis@latest/dist/lenis.min.js" }), s("script", { src: "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js" }), s("link", { href: "/static/style.css", rel: "stylesheet" }), s("script", { dangerouslySetInnerHTML: { __html: `
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  onyx: '#06060E',
                  slate: {
                    950: '#020408',
                  }
                }
              }
            }
          }
        ` } })] }), s("body", { class: "bg-onyx text-white overflow-x-hidden", style: "background-color: #06060E;", children: [s("div", { id: "cursor", class: "fixed w-4 h-4 rounded-full border border-cyan-400/70 pointer-events-none z-50 mix-blend-screen transition-transform duration-100", style: "transform: translate(-50%, -50%); top: 0; left: 0;" }), s("div", { id: "cursorTrail", class: "fixed w-8 h-8 rounded-full border border-cyan-400/20 pointer-events-none z-49 mix-blend-screen", style: "transform: translate(-50%, -50%); top: 0; left: 0;" }), s("nav", { id: "mainNav", class: "fixed top-0 left-0 right-0 z-40 px-6 py-4 transition-all duration-500", children: s("div", { class: "max-w-6xl mx-auto flex items-center justify-between", children: [s("a", { href: "#hero", class: "font-black text-white tracking-tight", style: "font-family: 'Space Grotesk', sans-serif; font-size: 1.1rem;", children: ["RN", s("span", { class: "text-cyan-400", children: "." })] }), s("div", { class: "hidden md:flex items-center gap-8", children: ["About", "Experience", "Skills", "Projects", "Contact"].map((t) => s("a", { href: `#${t.toLowerCase()}`, class: "text-slate-400 text-sm font-medium hover:text-white transition-colors duration-200 tracking-wide", children: t })) }), s("a", { href: "mailto:ritiknipane456@gmail.com", class: "hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-mono tracking-wider hover:bg-cyan-500/10 transition-all duration-300", children: "Hire Me \u2192" })] }) }), e, s("script", { src: "/static/app.js" })] })] }));
var Ot = new Mr();
Ot.use(hs);
Ot.get("/", (e) => e.render(s(gr, { children: [s("section", { id: "hero", class: "relative w-full h-screen overflow-hidden flex items-center justify-center", children: [s("canvas", { id: "heroCanvas", class: "absolute inset-0 w-full h-full z-0" }), s("div", { class: "absolute inset-0 z-1 pointer-events-none", style: "background: radial-gradient(ellipse at center, transparent 30%, rgba(6,6,14,0.85) 100%);" }), s("div", { class: "relative z-10 text-center px-6 select-none", children: [s("div", { class: "inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm", children: [s("span", { class: "w-2 h-2 rounded-full bg-cyan-400 animate-pulse" }), s("span", { class: "text-cyan-400 text-xs font-mono tracking-widest uppercase", children: "Available for Opportunities" })] }), s("h1", { id: "heroName", class: "hero-name text-7xl md:text-9xl font-black tracking-tight leading-none mb-6", style: "font-family: 'Space Grotesk', sans-serif; background: linear-gradient(135deg, #ffffff 0%, #94a3b8 50%, #ffffff 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;", children: "Ritik Nipane" }), s("div", { id: "heroSubtitle", class: "overflow-hidden mb-10", children: s("p", { class: "hero-subtitle text-lg md:text-2xl font-light tracking-[0.15em] text-slate-300", style: "font-family: 'Inter', sans-serif;", children: ["Data Analyst\xA0", s("span", { class: "text-cyan-400", children: "|" }), "\xA0Turning Complex Data into Actionable Intelligence"] }) }), s("div", { id: "heroCtas", class: "flex flex-wrap justify-center gap-4", children: [s("a", { href: "#projects", class: "magnetic-btn group relative px-8 py-3 rounded-full border border-cyan-500/60 bg-cyan-500/10 text-cyan-300 font-semibold text-sm tracking-wider uppercase overflow-hidden transition-all duration-300 hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-white hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]", children: s("span", { class: "relative z-10", children: "View Projects" }) }), s("a", { href: "#contact", class: "magnetic-btn group relative px-8 py-3 rounded-full border border-slate-700 bg-slate-800/40 text-slate-300 font-semibold text-sm tracking-wider uppercase backdrop-blur-sm transition-all duration-300 hover:border-slate-500 hover:text-white hover:bg-slate-700/50", children: s("span", { class: "relative z-10", children: "Get In Touch" }) })] })] }), s("div", { class: "absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2", children: [s("span", { class: "text-slate-500 text-[10px] font-mono tracking-[0.3em] uppercase", children: "Scroll" }), s("div", { class: "scroll-line w-px h-16 bg-gradient-to-b from-cyan-500/80 to-transparent", style: "animation: scrollLinePulse 2s ease-in-out infinite;" })] })] }), s("section", { id: "marquee-section", class: "relative py-5 overflow-hidden border-y border-cyan-500/10", style: "background: linear-gradient(180deg, rgba(6,6,14,1) 0%, rgba(8,12,24,1) 100%);", children: [s("div", { class: "absolute inset-0 pointer-events-none", style: "background: radial-gradient(ellipse 80% 100% at 50% 50%, rgba(6,182,212,0.04) 0%, transparent 70%);" }), s("div", { id: "marqueeTrack", class: "marquee-track flex gap-0 whitespace-nowrap cursor-pointer select-none", children: [1, 2, 3].map(() => s("div", { class: "marquee-inner flex items-center gap-0 flex-shrink-0", children: [{ icon: "\u{1F4C9}", label: "Reduced Discrepancies", value: "25%" }, { icon: "\u{1F4B0}", label: "Annual Savings", value: "\u20B95 Lakh" }, { icon: "\u{1F4E6}", label: "SKUs Centralized", value: "5,000+" }, { icon: "\u26A1", label: "Efficiency Improved", value: "20%" }, { icon: "\u{1F4CA}", label: "Dashboards Built", value: "15+" }, { icon: "\u{1F3AF}", label: "Risk Accuracy", value: "+15%" }, { icon: "\u{1F3ED}", label: "Overstocking Reduced", value: "15%" }, { icon: "\u{1F465}", label: "Teams Empowered", value: "50+" }].map((t) => s("div", { class: "marquee-item inline-flex items-center gap-4 px-8 py-1", children: [s("span", { class: "text-slate-500 text-xs font-mono", children: t.icon }), s("span", { class: "text-slate-400 text-sm font-medium tracking-wide", children: t.label }), s("span", { class: "text-cyan-400 text-lg font-bold font-mono tracking-tight", children: t.value }), s("span", { class: "text-slate-700 mx-2 text-xl", children: "\u2022" })] })) })) })] }), s("section", { id: "about", class: "relative py-32 px-6", style: "background: rgba(6,6,14,1);", children: s("div", { class: "max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center", children: [s("div", { class: "space-y-12", children: [s("div", { class: "reveal-up", children: [s("span", { class: "text-cyan-500/50 text-xs font-mono tracking-[0.4em] uppercase", children: "// About" }), s("h2", { class: "text-5xl md:text-6xl font-black text-white mt-4 leading-tight", style: "font-family: 'Space Grotesk', sans-serif;", children: ["Data-Driven", s("br", {}), s("span", { class: "text-gradient-cyan", children: "Decision Maker" })] })] }), s("div", { class: "grid grid-cols-2 gap-6", children: [{ num: "2+", label: "Years Experience" }, { num: "15+", label: "Dashboards Built" }, { num: "5K+", label: "SKUs Managed" }, { num: "\u20B95L", label: "Cost Savings" }].map((t) => s("div", { class: "stat-card reveal-up p-6 rounded-2xl border border-slate-800 bg-slate-900/50 group hover:border-cyan-500/30 transition-all duration-500", children: [s("div", { class: "text-4xl font-black text-white group-hover:text-cyan-400 transition-colors duration-300", style: "font-family: 'Space Grotesk', sans-serif;", children: t.num }), s("div", { class: "text-slate-500 text-sm mt-1", children: t.label })] })) })] }), s("div", { class: "reveal-up space-y-6", children: [s("p", { class: "text-slate-300 text-lg leading-relaxed", children: ["Data Analyst with ", s("span", { class: "text-cyan-400 font-semibold", children: "2+ years" }), " specializing in financial, operational, and supply chain risk analysis. I transform raw, complex datasets into strategic intelligence that drives measurable business outcomes."] }), s("p", { class: "text-slate-400 leading-relaxed", children: "Experienced in Python, MySQL, and Excel for cleaning, modeling, and analyzing large datasets. Skilled in building dashboards that identify risk patterns, detect anomalies, and support strategic decision-making." }), s("div", { class: "flex flex-wrap gap-3 pt-4", children: ["Python", "MySQL", "Power BI", "Tableau", "Pandas", "Looker"].map((t) => s("span", { class: "skill-tag px-4 py-2 rounded-full border border-slate-700 bg-slate-800/50 text-slate-300 text-sm font-mono hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all duration-300 cursor-default", children: t })) }), s("div", { class: "flex gap-4 pt-2", children: s("a", { href: "mailto:ritiknipane456@gmail.com", class: "text-slate-400 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2", children: [s("svg", { class: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: s("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }), "ritiknipane456@gmail.com"] }) })] })] }) }), s("section", { id: "experience", class: "relative py-24 px-6 overflow-hidden", style: "background: linear-gradient(180deg, rgba(6,6,14,1) 0%, rgba(4,8,20,1) 100%);", children: s("div", { class: "max-w-6xl mx-auto", children: [s("div", { class: "text-center mb-20 reveal-up", children: [s("span", { class: "text-cyan-500/50 text-xs font-mono tracking-[0.4em] uppercase", children: "// Experience" }), s("h2", { class: "text-5xl md:text-6xl font-black text-white mt-4", style: "font-family: 'Space Grotesk', sans-serif;", children: ["The ", s("span", { class: "text-gradient-cyan", children: "Data Pipeline" })] }), s("p", { class: "text-slate-500 mt-4 max-w-xl mx-auto", children: "A career journey where each role fed insights forward \u2014 like data flowing through a processing pipeline." })] }), s("div", { class: "timeline-container relative", children: [s("svg", { id: "pipelineSvg", class: "pipeline-svg absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none z-0", width: "4", height: "100%", viewBox: "0 0 4 800", preserveAspectRatio: "none", style: "height: 100%; overflow: visible;", children: [s("defs", { children: [s("linearGradient", { id: "pipeGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [s("stop", { offset: "0%", "stop-color": "#06b6d4", "stop-opacity": "0.8" }), s("stop", { offset: "100%", "stop-color": "#0ea5e9", "stop-opacity": "0.2" })] }), s("filter", { id: "glow", children: [s("feGaussianBlur", { stdDeviation: "3", result: "coloredBlur" }), s("feMerge", { children: [s("feMergeNode", { in: "coloredBlur" }), s("feMergeNode", { in: "SourceGraphic" })] })] })] }), s("line", { x1: "2", y1: "0", x2: "2", y2: "800", stroke: "rgba(6,182,212,0.15)", "stroke-width": "2" }), s("circle", { id: "dataPacket", cx: "2", cy: "0", r: "5", fill: "#06b6d4", filter: "url(#glow)", opacity: "0", children: s("animate", { attributeName: "opacity", values: "0.6;1;0.6", dur: "1.5s", repeatCount: "indefinite" }) }), s("line", { id: "pipelineProgress", x1: "2", y1: "0", x2: "2", y2: "0", stroke: "url(#pipeGrad)", "stroke-width": "2" })] }), s("div", { class: "timeline-cards space-y-24 relative z-10", children: [s("div", { class: "timeline-entry group relative flex flex-col md:flex-row items-start gap-8 md:gap-16", "data-index": "0", children: [s("div", { class: "timeline-node hidden md:flex absolute left-1/2 -translate-x-1/2 top-8 w-5 h-5 rounded-full border-2 border-cyan-500 bg-slate-950 z-20 items-center justify-center", children: s("div", { class: "w-2 h-2 rounded-full bg-cyan-400" }) }), s("div", { class: "md:w-1/2 md:text-right md:pr-16 pt-2 reveal-left", children: [s("div", { class: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-3", children: [s("span", { class: "w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" }), s("span", { class: "text-cyan-400 text-xs font-mono", children: "Apr 2024 \u2013 Present" })] }), s("div", { class: "text-slate-500 text-sm font-mono", children: "Mumbai, India" }), s("div", { class: "mt-4 flex md:justify-end gap-2 flex-wrap", children: ["Python", "Power BI", "Looker", "MySQL"].map((t) => s("span", { class: "text-xs px-2 py-1 rounded bg-slate-800 text-slate-400 font-mono", children: t })) })] }), s("div", { class: "md:w-1/2 md:pl-16 reveal-right", children: s("div", { class: "experience-card relative p-8 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 overflow-hidden group-hover:border-cyan-500/30 transition-all duration-500", style: "transform-style: preserve-3d;", children: [s("div", { class: "absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" }), s("div", { class: "absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" }), s("div", { class: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/10 border border-cyan-500/30 mb-4", children: [s("svg", { class: "w-3 h-3 text-cyan-400", fill: "currentColor", viewBox: "0 0 20 20", children: s("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) }), s("span", { class: "text-cyan-400 text-xs font-semibold", children: "Current Role" })] }), s("h3", { class: "text-2xl font-black text-white mb-1", style: "font-family: 'Space Grotesk', sans-serif;", children: "Data Analyst" }), s("p", { class: "text-cyan-400 font-semibold mb-6", children: "BTIPL" }), s("ul", { class: "space-y-3", children: [{ icon: "\u{1F4B9}", text: "Built automated dashboards for revenue, expenses, cash flow & P&L \u2014 enabling early detection of loss-making months." }, { icon: "\u{1F50D}", text: "Developed Expense Tracking System that cut financial discrepancies by 25% and identified cost leakages across logistics and warehousing." }, { icon: "\u{1F30D}", text: "Analyzed supplier risk across Japan, China & Europe \u2014 tracking pricing trends, lead times, and duty fluctuations. Result: \u20B95 Lakh annual savings." }, { icon: "\u{1F4E6}", text: "Inventory Risk Analysis using 1Y/6M/3M sales trends for MSQ, Safety Stock, and reorder levels \u2014 reducing overstocking by 15%." }, { icon: "\u{1F3AF}", text: "Centralized 5,000+ SKUs in a Bearing Stock & Sales Monitoring Dashboard, cutting manual tracking errors by 20%." }, { icon: "\u{1F465}", text: "Standardized reporting systems empowering 50+ employees across sales, purchase, and finance teams." }].map((t) => s("li", { class: "exp-bullet flex items-start gap-3 text-slate-400 text-sm leading-relaxed", children: [s("span", { class: "text-base flex-shrink-0 mt-0.5", children: t.icon }), s("span", { children: t.text })] })) })] }) })] }), s("div", { class: "timeline-entry group relative flex flex-col md:flex-row items-start gap-8 md:gap-16", "data-index": "1", children: [s("div", { class: "timeline-node hidden md:flex absolute left-1/2 -translate-x-1/2 top-8 w-5 h-5 rounded-full border-2 border-amber-500 bg-slate-950 z-20 items-center justify-center", children: s("div", { class: "w-2 h-2 rounded-full bg-amber-400" }) }), s("div", { class: "md:w-1/2 md:pr-16 reveal-left", children: s("div", { class: "experience-card relative p-8 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 overflow-hidden group-hover:border-amber-500/30 transition-all duration-500", style: "transform-style: preserve-3d;", children: [s("div", { class: "absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" }), s("div", { class: "absolute top-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" }), s("div", { class: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4", children: [s("span", { class: "w-1.5 h-1.5 rounded-full bg-amber-400" }), s("span", { class: "text-amber-400 text-xs font-semibold", children: "Strategy Intern" })] }), s("h3", { class: "text-2xl font-black text-white mb-1", style: "font-family: 'Space Grotesk', sans-serif;", children: "Strategy Intern" }), s("p", { class: "text-amber-400 font-semibold mb-6", children: "Liquiloans" }), s("ul", { class: "space-y-3", children: [{ icon: "\u{1F4CA}", text: "Developed 5 risk & performance monitoring dashboards using Power BI, Looker Studio, Excel & Python for portfolio trend analysis." }, { icon: "\u{1F3C5}", text: "Built a unified Gold Loan Risk Dashboard \u2014 improving operational risk efficiency by 20%." }, { icon: "\u{1F50E}", text: "Analyzed corporate & IFA historical data to identify risk patterns and default trends, improving risk assessment accuracy by 15%." }, { icon: "\u2699\uFE0F", text: "Streamlined data flows with cross-functional teams, contributing to a 10% reduction in operational turnaround time." }].map((t) => s("li", { class: "exp-bullet flex items-start gap-3 text-slate-400 text-sm leading-relaxed", children: [s("span", { class: "text-base flex-shrink-0 mt-0.5", children: t.icon }), s("span", { children: t.text })] })) })] }) }), s("div", { class: "md:w-1/2 md:pl-16 pt-2 reveal-right", children: [s("div", { class: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-3", children: [s("span", { class: "w-1.5 h-1.5 rounded-full bg-amber-400" }), s("span", { class: "text-amber-400 text-xs font-mono", children: "Nov 2023 \u2013 Feb 2024" })] }), s("div", { class: "text-slate-500 text-sm font-mono", children: "Mumbai, India" }), s("div", { class: "mt-4 flex gap-2 flex-wrap", children: ["Power BI", "Looker", "Python", "Excel"].map((t) => s("span", { class: "text-xs px-2 py-1 rounded bg-slate-800 text-slate-400 font-mono", children: t })) })] })] }), s("div", { class: "timeline-entry group relative flex flex-col md:flex-row items-start gap-8 md:gap-16", "data-index": "2", children: [s("div", { class: "timeline-node hidden md:flex absolute left-1/2 -translate-x-1/2 top-8 w-5 h-5 rounded-full border-2 border-violet-500 bg-slate-950 z-20 items-center justify-center", children: s("div", { class: "w-2 h-2 rounded-full bg-violet-400" }) }), s("div", { class: "md:w-1/2 md:text-right md:pr-16 pt-2 reveal-left", children: [s("div", { class: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 mb-3", children: [s("span", { class: "w-1.5 h-1.5 rounded-full bg-violet-400" }), s("span", { class: "text-violet-400 text-xs font-mono", children: "Jun 2023 \u2013 Nov 2023" })] }), s("div", { class: "text-slate-500 text-sm font-mono", children: "Mumbai, India" }), s("div", { class: "mt-4 flex md:justify-end gap-2 flex-wrap", children: ["Python", "MySQL", "Looker", "Excel"].map((t) => s("span", { class: "text-xs px-2 py-1 rounded bg-slate-800 text-slate-400 font-mono", children: t })) })] }), s("div", { class: "md:w-1/2 md:pl-16 reveal-right", children: s("div", { class: "experience-card relative p-8 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 overflow-hidden group-hover:border-violet-500/30 transition-all duration-500", style: "transform-style: preserve-3d;", children: [s("div", { class: "absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" }), s("div", { class: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 mb-4", children: [s("span", { class: "w-1.5 h-1.5 rounded-full bg-violet-400" }), s("span", { class: "text-violet-400 text-xs font-semibold", children: "Data Science Intern" })] }), s("h3", { class: "text-2xl font-black text-white mb-1", style: "font-family: 'Space Grotesk', sans-serif;", children: "Data Science Intern" }), s("p", { class: "text-violet-400 font-semibold mb-6", children: "FlipRobo" }), s("ul", { class: "space-y-3", children: [{ icon: "\u{1F9EE}", text: "Analyzed financial data using Python, MySQL, Looker & Excel \u2014 driving insights that boosted operational efficiency by 15%." }, { icon: "\u2699\uFE0F", text: "Configured and enhanced finance modules within Workday, improving module accuracy by 95%." }, { icon: "\u{1F517}", text: "Collaborated with cross-functional teams to optimize data workflows, reducing processing errors by 20%." }].map((t) => s("li", { class: "exp-bullet flex items-start gap-3 text-slate-400 text-sm leading-relaxed", children: [s("span", { class: "text-base flex-shrink-0 mt-0.5", children: t.icon }), s("span", { children: t.text })] })) })] }) })] })] })] })] }) }), s("section", { id: "skills", class: "relative py-32 px-6", style: "background: rgba(6,6,14,1);", children: s("div", { class: "max-w-6xl mx-auto", children: [s("div", { class: "text-center mb-20 reveal-up", children: [s("span", { class: "text-cyan-500/50 text-xs font-mono tracking-[0.4em] uppercase", children: "// Skills" }), s("h2", { class: "text-5xl md:text-6xl font-black text-white mt-4", style: "font-family: 'Space Grotesk', sans-serif;", children: ["Technical ", s("span", { class: "text-gradient-cyan", children: "Arsenal" })] })] }), s("div", { class: "flex flex-col lg:flex-row gap-16 items-center", children: [s("div", { class: "lg:w-1/2 flex justify-center reveal-left", children: s("canvas", { id: "radarChart", width: "420", height: "420", class: "max-w-full" }) }), s("div", { class: "lg:w-1/2 space-y-8 reveal-right", children: [{ category: "Languages", color: "cyan", skills: ["Python", "MySQL", "SQL (Intermediate)"] }, { category: "Frameworks & Libraries", color: "blue", skills: ["Pandas", "Matplotlib", "Seaborn", "Scikit-learn"] }, { category: "BI & Visualization Tools", color: "amber", skills: ["Power BI", "Tableau", "Looker Studio", "Google Sheets"] }, { category: "Core Competencies", color: "violet", skills: ["Risk Analysis", "Financial Modeling", "Supply Chain Analytics", "Excel"] }].map((t) => s("div", { class: "skill-category", "data-color": t.color, children: [s("div", { class: "flex items-center gap-3 mb-3", children: [s("div", { class: `w-2 h-2 rounded-full skill-dot-${t.color}` }), s("span", { class: `text-sm font-mono tracking-wider uppercase skill-label-${t.color}`, children: t.category })] }), s("div", { class: "flex flex-wrap gap-2", children: t.skills.map((r) => s("span", { class: `skill-tag-interactive px-4 py-2 rounded-full border text-sm font-medium cursor-default select-none skill-chip-${t.color}`, "data-skill": r, children: r })) })] })) })] })] }) }), s("section", { id: "projects", class: "relative py-24", style: "background: linear-gradient(180deg, rgba(6,6,14,1) 0%, rgba(4,8,20,1) 100%);", children: [s("div", { class: "max-w-6xl mx-auto px-6 mb-16 text-center reveal-up", children: [s("span", { class: "text-cyan-500/50 text-xs font-mono tracking-[0.4em] uppercase", children: "// Projects" }), s("h2", { class: "text-5xl md:text-6xl font-black text-white mt-4", style: "font-family: 'Space Grotesk', sans-serif;", children: ["Featured ", s("span", { class: "text-gradient-cyan", children: "Work" })] }), s("p", { class: "text-slate-500 mt-4 max-w-xl mx-auto", children: "Real-world data solutions built to reduce risk, cut costs, and drive strategic growth." })] }), s("div", { id: "projectsPin", class: "projects-pin-container", children: [{ id: "proj1", num: "01", title: "Supply Chain Risk Intelligence", subtitle: "BTIPL \u2014 Operational Risk", desc: "End-to-end supply chain risk dashboard tracking import pricing trends, lead times, shipment delays, and duty fluctuations across suppliers in Japan, China, and Europe.", metrics: ["\u20B95L Saved", "25% Fewer Errors", "3 Regions"], color: "cyan", tags: ["Python", "Power BI", "MySQL"], icon: "\u{1F310}" }, { id: "proj2", num: "02", title: "Inventory & Stock Optimizer", subtitle: "BTIPL \u2014 Inventory Analytics", desc: "Centralized 5,000+ bearing SKUs with automated MSQ, Safety Stock, and reorder level calculations using 1Y/6M/3M sales trend analysis. Cut overstocking by 15%.", metrics: ["5K+ SKUs", "15% Less Overstock", "20% Error Reduction"], color: "amber", tags: ["Excel", "Python", "Looker"], icon: "\u{1F4E6}" }, { id: "proj3", num: "03", title: "Gold Loan Risk Dashboard", subtitle: "Liquiloans \u2014 Credit Risk", desc: "Unified Gold Loan Risk Dashboard providing visibility into credit risk indicators, IFA performance profiles, and portfolio-wide anomaly detection for strategic risk mitigation.", metrics: ["20% Efficiency Gain", "15% Better Accuracy", "5 Dashboards"], color: "violet", tags: ["Power BI", "Looker", "Python"], icon: "\u{1F3C5}" }, { id: "proj4", num: "04", title: "Financial P&L Automation", subtitle: "BTIPL \u2014 Financial Analytics", desc: "Automated revenue, expense, cash flow, and P&L dashboards for early detection of loss-making months, cash shortages, and margin risks across product segments.", metrics: ["50+ Users", "Real-time Alerts", "Margin Insights"], color: "blue", tags: ["Power BI", "Excel", "Python"], icon: "\u{1F4B9}" }].map((t, r) => s("div", { class: "project-slide relative min-h-screen flex flex-col lg:flex-row items-center gap-0", "data-project": t.id, children: [s("div", { class: "project-info lg:w-5/12 px-8 lg:px-16 py-16 flex flex-col justify-center min-h-screen", children: s("div", { class: "reveal-up", children: [s("div", { class: `inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 project-badge-${t.color}`, children: [s("span", { class: "text-lg", children: t.icon }), s("span", { class: `text-xs font-mono project-badge-text-${t.color}`, children: t.subtitle })] }), s("div", { class: "text-slate-700 font-black text-8xl mb-2 font-mono leading-none", children: t.num }), s("h3", { class: `text-3xl md:text-4xl font-black text-white mb-6 leading-tight project-title-${t.color}`, style: "font-family: 'Space Grotesk', sans-serif;", children: t.title }), s("p", { class: "text-slate-400 leading-relaxed mb-8", children: t.desc }), s("div", { class: "flex flex-wrap gap-2 mb-8", children: t.metrics.map((n) => s("span", { class: `px-3 py-1 rounded-full text-xs font-bold font-mono project-metric-${t.color}`, children: n })) }), s("div", { class: "flex flex-wrap gap-2 mb-10", children: t.tags.map((n) => s("span", { class: "px-3 py-1 rounded bg-slate-800 text-slate-400 text-xs font-mono", children: n })) }), s("a", { href: "#contact", class: `magnetic-btn view-btn inline-flex items-center gap-3 px-7 py-3 rounded-full font-semibold text-sm tracking-wider view-btn-${t.color}`, children: [s("span", { children: "Explore Project" }), s("svg", { class: "w-4 h-4 transition-transform duration-300 group-hover:translate-x-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: s("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M17 8l4 4m0 0l-4 4m4-4H3" }) })] })] }) }), s("div", { class: `project-visual lg:w-7/12 min-h-screen flex items-center justify-center p-8 lg:p-16 project-visual-bg-${t.color}`, children: s("div", { class: "project-mockup w-full max-w-2xl reveal-up", children: s("div", { class: "relative rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl", style: "background: rgba(8,12,24,0.95);", children: [s("div", { class: "flex items-center gap-2 px-4 py-3 border-b border-slate-800", children: [s("div", { class: "flex gap-1.5", children: [s("div", { class: "w-3 h-3 rounded-full bg-red-500/60" }), s("div", { class: "w-3 h-3 rounded-full bg-yellow-500/60" }), s("div", { class: "w-3 h-3 rounded-full bg-green-500/60" })] }), s("div", { class: "flex-1 mx-4", children: s("div", { class: "h-5 rounded-md bg-slate-800 flex items-center px-3", children: s("span", { class: `text-xs font-mono project-url-text-${t.color}`, children: ["analytics.btipl.com/", t.id] }) }) })] }), s("div", { class: "p-6 space-y-4", style: "min-height: 360px;", children: [s("div", { class: "grid grid-cols-3 gap-3", children: t.metrics.map((n, i) => s("div", { class: `metric-card p-4 rounded-xl metric-card-${t.color}`, children: [s("div", { class: `text-lg font-black font-mono metric-val-${t.color}`, children: n.split(" ")[0] }), s("div", { class: "text-slate-500 text-xs mt-1", children: n.split(" ").slice(1).join(" ") })] })) }), s("div", { class: `chart-area rounded-xl p-4 chart-bg-${t.color}`, style: "height: 140px; position: relative; overflow: hidden;", children: [s("div", { class: "absolute top-3 left-4 right-4 flex justify-between items-center", children: [s("span", { class: "text-slate-400 text-xs font-mono", children: "Trend Analysis" }), s("span", { class: `text-xs font-mono chart-label-${t.color}`, children: "Live" })] }), s("div", { class: "absolute bottom-4 left-4 right-4 flex items-end gap-1.5", style: "height: 80px;", children: [60, 75, 45, 90, 65, 80, 55, 95, 70, 85, 50, 88].map((n, i) => s("div", { class: `flex-1 rounded-sm chart-bar-${t.color}`, style: `height: ${n}%; opacity: ${0.4 + i % 4 * 0.15}; animation: barGrow 1s ease-out ${i * 0.05}s both;` })) })] }), s("div", { class: "grid grid-cols-2 gap-3", children: [s("div", { class: `rounded-xl p-4 row-card-${t.color}`, children: [s("div", { class: "text-slate-500 text-xs font-mono mb-2", children: "Risk Score" }), s("div", { class: "h-2 rounded-full bg-slate-800 overflow-hidden", children: s("div", { class: `h-full rounded-full risk-bar-${t.color}`, style: "width: 72%; animation: fillBar 1.5s ease-out 0.5s both;" }) }), s("div", { class: `text-xs font-mono mt-1 risk-label-${t.color}`, children: "72 / 100" })] }), s("div", { class: `rounded-xl p-4 row-card-${t.color}`, children: [s("div", { class: "text-slate-500 text-xs font-mono mb-2", children: "Data Quality" }), s("div", { class: "h-2 rounded-full bg-slate-800 overflow-hidden", children: s("div", { class: `h-full rounded-full quality-bar-${t.color}`, style: "width: 94%; animation: fillBar 1.5s ease-out 0.7s both;" }) }), s("div", { class: `text-xs font-mono mt-1 quality-label-${t.color}`, children: "94 / 100" })] })] })] })] }) }) })] })) })] }), s("section", { id: "education", class: "relative py-32 px-6", style: "background: rgba(6,6,14,1);", children: s("div", { class: "max-w-6xl mx-auto", children: [s("div", { class: "text-center mb-20 reveal-up", children: [s("span", { class: "text-cyan-500/50 text-xs font-mono tracking-[0.4em] uppercase", children: "// Education & Certifications" }), s("h2", { class: "text-5xl md:text-6xl font-black text-white mt-4", style: "font-family: 'Space Grotesk', sans-serif;", children: ["Built on ", s("span", { class: "text-gradient-cyan", children: "Knowledge" })] })] }), s("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-12", children: [s("div", { class: "reveal-left", children: s("div", { class: "p-8 rounded-2xl border border-slate-800 bg-slate-900/50 h-full", children: [s("div", { class: "flex items-start gap-4 mb-8", children: [s("div", { class: "w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0", children: s("svg", { class: "w-6 h-6 text-cyan-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [s("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M12 14l9-5-9-5-9 5 9 5z" }), s("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" })] }) }), s("div", { children: [s("h3", { class: "text-xl font-black text-white", style: "font-family: 'Space Grotesk', sans-serif;", children: "B.Sc. Information Technology" }), s("p", { class: "text-cyan-400 font-medium mt-1", children: "University of Mumbai" }), s("p", { class: "text-slate-500 text-sm mt-1", children: "CGPA: 7.3 \u2022 Mumbai, India" })] })] }), s("div", { class: "space-y-2", children: [s("p", { class: "text-slate-500 text-xs font-mono tracking-wider uppercase mb-3", children: "Relevant Coursework" }), ["Machine Learning", "Data Structures & Algorithms", "Data Visualization", "Data Science"].map((t) => s("div", { class: "flex items-center gap-3 text-slate-400 text-sm", children: [s("div", { class: "w-1 h-1 rounded-full bg-cyan-500" }), t] }))] })] }) }), s("div", { class: "reveal-right", children: s("div", { class: "p-8 rounded-2xl border border-slate-800 bg-slate-900/50 h-full", children: [s("div", { class: "flex items-center gap-3 mb-8", children: [s("div", { class: "w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0", children: s("svg", { class: "w-6 h-6 text-amber-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: s("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" }) }) }), s("h3", { class: "text-xl font-black text-white", style: "font-family: 'Space Grotesk', sans-serif;", children: "Certifications" })] }), s("div", { class: "space-y-3", children: [{ name: "IBM Python for Data Science", org: "IBM" }, { name: "Data Analytics & Visualization", org: "Accenture" }, { name: "SQL (Intermediate)", org: "HackerRank" }, { name: "Microsoft 365 Certified", org: "Microsoft" }, { name: "Data Science Certification", org: "Industry" }, { name: "Data Analysis using Excel", org: "Industry" }].map((t) => s("div", { class: "cert-item flex items-center justify-between py-2 border-b border-slate-800 last:border-0 group", children: [s("div", { class: "flex items-center gap-3", children: [s("div", { class: "w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0", children: s("div", { class: "w-2 h-2 rounded-full bg-amber-400" }) }), s("span", { class: "text-slate-300 text-sm group-hover:text-white transition-colors", children: t.name })] }), s("span", { class: "text-slate-600 text-xs font-mono", children: t.org })] })) })] }) })] })] }) }), s("section", { id: "contact", class: "relative py-32 px-6 overflow-hidden", style: "background: linear-gradient(180deg, rgba(6,6,14,1) 0%, rgba(2,4,12,1) 100%);", children: [s("div", { class: "absolute inset-0 pointer-events-none", style: "background: radial-gradient(ellipse 60% 50% at 50% 100%, rgba(6,182,212,0.08) 0%, transparent 70%);" }), s("div", { class: "max-w-4xl mx-auto text-center relative z-10", children: [s("div", { class: "reveal-up", children: [s("span", { class: "text-cyan-500/50 text-xs font-mono tracking-[0.4em] uppercase", children: "// Contact" }), s("h2", { class: "text-5xl md:text-7xl font-black text-white mt-4 mb-8 leading-tight", style: "font-family: 'Space Grotesk', sans-serif;", children: ["Let's Build", s("br", {}), s("span", { class: "text-gradient-cyan", children: "Something Impactful" })] }), s("p", { class: "text-slate-400 text-lg max-w-xl mx-auto mb-12 leading-relaxed", children: "I'm actively looking for the next big challenge. If you need someone to transform your data into competitive advantage, let's talk." })] }), s("div", { class: "reveal-up flex flex-col sm:flex-row justify-center gap-4 mb-16", children: [s("a", { href: "mailto:ritiknipane456@gmail.com", class: "magnetic-btn group flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 font-semibold hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-white hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] transition-all duration-300", children: [s("svg", { class: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: s("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }), "ritiknipane456@gmail.com"] }), s("a", { href: "tel:+919082116054", class: "magnetic-btn flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-slate-700 text-slate-300 font-semibold hover:border-slate-500 hover:text-white hover:bg-slate-800/50 transition-all duration-300", children: [s("svg", { class: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: s("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" }) }), "+91 9082116054"] })] }), s("div", { class: "reveal-up flex justify-center gap-6", children: [{ name: "LinkedIn", url: "https://linkedin.com/in/RitikNipane", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" }, { name: "GitHub", url: "https://github.com/RitikNipane", icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" }].map((t) => s("a", { href: t.url, target: "_blank", rel: "noopener noreferrer", class: "group w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300", children: s("svg", { class: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: s("path", { d: t.icon }) }) })) })] })] }), s("footer", { class: "border-t border-slate-900 py-8 px-6", style: "background: rgba(2,4,12,1);", children: s("div", { class: "max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4", children: [s("span", { class: "text-slate-600 text-sm font-mono", children: "\xA9 2025 Ritik Nipane. All rights reserved." }), s("span", { class: "text-slate-700 text-xs font-mono", children: "Built with precision. Driven by data." })] }) })] })));
var Zt = new Mr();
var us = Object.assign({ "/src/index.tsx": Ot });
var zr = false;
for (const [, e] of Object.entries(us)) e && (Zt.all("*", (t) => {
  let r;
  try {
    r = t.executionCtx;
  } catch {
  }
  return e.fetch(t.req.raw, t.env, r);
}), Zt.notFound((t) => {
  let r;
  try {
    r = t.executionCtx;
  } catch {
  }
  return e.fetch(t.req.raw, t.env, r);
}), zr = true);
if (!zr) throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");

// ../node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } catch (e) {
    const error3 = reduceError(e);
    return Response.json(error3, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// ../.wrangler/tmp/bundle-sQ9OE7/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = Zt;

// ../node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env2, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env2, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env2, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env2, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// ../.wrangler/tmp/bundle-sQ9OE7/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env2, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env2, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env2, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env2, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env2, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env2, ctx) => {
      this.env = env2;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=bundledWorker-0.6120542082916367.mjs.map
