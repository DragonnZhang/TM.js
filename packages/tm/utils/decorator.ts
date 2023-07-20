function bindThis<This, Args extends any[], Return>(
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
    ;(this as any)[methodName] = originalMethod.bind(this as any)
  })
}

export { bindThis }
