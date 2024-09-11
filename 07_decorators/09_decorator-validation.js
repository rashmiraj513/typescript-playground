var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
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
var registeredValidators = {};
var Required = function (target, propName) {
  var _a;
  registeredValidators[target.constructor.name] = __assign(
    __assign({}, registeredValidators[target.constructor.name]),
    ((_a = {}), (_a[propName] = ['required']), _a),
  );
};
var PositiveNumber = function (target, propName) {
  var _a;
  registeredValidators[target.constructor.name] = __assign(
    __assign({}, registeredValidators[target.constructor.name]),
    ((_a = {}), (_a[propName] = ['positive']), _a),
  );
};
var validate = function (obj) {
  var objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  var isValid = true;
  for (var prop in objValidatorConfig) {
    for (var _i = 0, _a = objValidatorConfig[prop]; _i < _a.length; _i++) {
      var validator = _a[_i];
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
};
var Course = (function () {
  var _a;
  var _title_decorators;
  var _title_initializers = [];
  var _title_extraInitializers = [];
  var _price_decorators;
  var _price_initializers = [];
  var _price_extraInitializers = [];
  return (
    (_a = /** @class */ (function () {
      function Course(t, p) {
        this.title = __runInitializers(this, _title_initializers, void 0);
        this.price =
          (__runInitializers(this, _title_extraInitializers),
          __runInitializers(this, _price_initializers, void 0));
        __runInitializers(this, _price_extraInitializers);
        this.title = t;
        this.price = p;
      }
      return Course;
    })()),
    (function () {
      var _metadata =
        typeof Symbol === 'function' && Symbol.metadata
          ? Object.create(null)
          : void 0;
      _title_decorators = [Required];
      _price_decorators = [PositiveNumber];
      __esDecorate(
        null,
        null,
        _title_decorators,
        {
          kind: 'field',
          name: 'title',
          static: false,
          private: false,
          access: {
            has: function (obj) {
              return 'title' in obj;
            },
            get: function (obj) {
              return obj.title;
            },
            set: function (obj, value) {
              obj.title = value;
            },
          },
          metadata: _metadata,
        },
        _title_initializers,
        _title_extraInitializers,
      );
      __esDecorate(
        null,
        null,
        _price_decorators,
        {
          kind: 'field',
          name: 'price',
          static: false,
          private: false,
          access: {
            has: function (obj) {
              return 'price' in obj;
            },
            get: function (obj) {
              return obj.price;
            },
            set: function (obj, value) {
              obj.price = value;
            },
          },
          metadata: _metadata,
        },
        _price_initializers,
        _price_extraInitializers,
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
var courseForm = document.querySelector('form');
courseForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var titleEl = document.getElementById('title');
  var priceEl = document.getElementById('price');
  var title = titleEl.value;
  var price = +priceEl.value;
  var createdCourse = new Course(title, price);
  if (!validate(createdCourse)) {
    alert('Invalid input, please try again!');
    return;
  }
  console.log(createdCourse);
});
