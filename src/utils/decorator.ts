// eslint-disable-next-line @typescript-eslint/no-explicit-any
function bindThis<This, Args extends any[], Return>(
  // eslint-disable-next-line no-unused-vars
  originalMethod: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext
) {
  const methodName = String(context.name)
  if (context.private) {
    throw new Error(
      `'bound' cannot decorate private properties like ${methodName as string}.`
    )
  }

  context.addInitializer(function () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(this as any)[methodName] = originalMethod.bind(this as any)
  })
}

export { bindThis }
