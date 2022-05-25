export function bind(target: any, propertyKey: string): TypedPropertyDescriptor<any> {
  const fn = target[propertyKey];
  if (typeof fn !== 'function') {
    throw new TypeError(`Only methods can be decorated with @bind. <${propertyKey}> is not a method!`);
  }

  return {
    configurable: true,
    get() {
      const bound = fn.bind(this);
      Object.defineProperty(this, propertyKey, {
        value: bound,
        configurable: true,
        writable: true,
      });
      return bound;
    },
  };
}

// побочный эфект - биндит this
export function noMulticall(
  target: any,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<any>,
): TypedPropertyDescriptor<any> {
  const fn = descriptor.value;
  if (typeof fn !== 'function') {
    throw new TypeError(`Only methods can be decorated with @bind. <${propertyKey}> is not a method!`);
  }
  return {
    configurable: true,
    get() {
      const wrappedFn = async (...arg: any) => {
        const loadingKey = `isBusy___${propertyKey}`;
        // @ts-ignore
        if (!this[loadingKey]) {
          // @ts-ignore
          this[loadingKey] = true;
          await fn.bind(this)(...arg);
          // @ts-ignore
          this[loadingKey] = false;
        }
      };
      Object.defineProperty(this, propertyKey, {
        value: wrappedFn,
        configurable: true,
        writable: true,
      });
      return wrappedFn;
    },
  };
}
