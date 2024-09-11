var __runInitializers =
  (this && this.__runInitializers) ||
  function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
      value = useValue
        ? initializers[i].call(thisArg, value)
        : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
  };
var __esDecorate =
  (this && this.__esDecorate) ||
  function (
    ctor,
    descriptorIn,
    decorators,
    contextIn,
    initializers,
    extraInitializers,
  ) {
    function accept(f) {
      if (f !== void 0 && typeof f !== 'function')
        throw new TypeError('Function expected');
      return f;
    }
    var kind = contextIn.kind,
      key = kind === 'getter' ? 'get' : kind === 'setter' ? 'set' : 'value';
    var target =
      !descriptorIn && ctor
        ? contextIn['static']
          ? ctor
          : ctor.prototype
        : null;
    var descriptor =
      descriptorIn ||
      (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _,
      done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === 'access' ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) {
        if (done)
          throw new TypeError(
            'Cannot add initializers after decoration has completed',
          );
        extraInitializers.push(accept(f || null));
      };
      var result = (0, decorators[i])(
        kind === 'accessor'
          ? { get: descriptor.get, set: descriptor.set }
          : descriptor[key],
        context,
      );
      if (kind === 'accessor') {
        if (result === void 0) continue;
        if (result === null || typeof result !== 'object')
          throw new TypeError('Object expected');
        if ((_ = accept(result.get))) descriptor.get = _;
        if ((_ = accept(result.set))) descriptor.set = _;
        if ((_ = accept(result.init))) initializers.unshift(_);
      } else if ((_ = accept(result))) {
        if (kind === 'field') initializers.unshift(_);
        else descriptor[key] = _;
      }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
  };
var Autobind = function (_, _2, descriptor) {
  var originalMethod = descriptor.value;
  var adjDescriptor = {
    configurable: true,
    enumerable: false,
    get: function () {
      var boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
};
var Printer = (function () {
  var _a;
  var _instanceExtraInitializers = [];
  var _showMessage_decorators;
  return (
    (_a = /** @class */ (function () {
      function Printer() {
        this.message =
          (__runInitializers(this, _instanceExtraInitializers), 'This works!');
      }
      Printer.prototype.showMessage = function () {
        console.log(this.message);
      };
      return Printer;
    })()),
    (function () {
      var _metadata =
        typeof Symbol === 'function' && Symbol.metadata
          ? Object.create(null)
          : void 0;
      _showMessage_decorators = [Autobind];
      __esDecorate(
        _a,
        null,
        _showMessage_decorators,
        {
          kind: 'method',
          name: 'showMessage',
          static: false,
          private: false,
          access: {
            has: function (obj) {
              return 'showMessage' in obj;
            },
            get: function (obj) {
              return obj.showMessage;
            },
          },
          metadata: _metadata,
        },
        null,
        _instanceExtraInitializers,
      );
      if (_metadata)
        Object.defineProperty(_a, Symbol.metadata, {
          enumerable: true,
          configurable: true,
          writable: true,
          value: _metadata,
        });
    })(),
    _a
  );
})();
var p = new Printer();
p.showMessage();
var button = document.querySelector('button');
button.addEventListener('click', p.showMessage);
