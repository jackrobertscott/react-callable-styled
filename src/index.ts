import { CSSInterpolation, css } from "@emotion/css"
import { createElement } from "react"
import { ComponentCb, convertChildrenProps } from "react-callable-components"

/**
 * Type definition for the arguments accepted by StyledComponent.
 * It can either be a TemplateStringsArray with any additional values,
 * or an array of CSSInterpolation.
 */
export type StyledComponentArgs =
  | [TemplateStringsArray, ...any[]]
  | CSSInterpolation[]

/**
 * Defines a type for the StyledProxy. This type maps each key in HTMLElementTagNameMap
 * to a function that takes StyledComponentArgs and returns a ComponentCb with
 * `className` and `dotClassName` properties.
 */
export type StyledProxy = {
  [K in keyof HTMLElementTagNameMap]: (
    ...args: StyledComponentArgs
  ) => ComponentCb<K> & { className: string; dotClassName: string }
}

/**
 * Creates a new styled proxy. This proxy handles creating styled components
 * for each HTML element. It uses a get trap to intercept property access
 * and returns a component builder function for the requested HTML element.
 */
export const styled = new Proxy<StyledProxy>({} as any, {
  /**
   * The get trap for the proxy. It is invoked when accessing a property on the styled object.
   * @param _ - The target object of the proxy. Not used in this implementation.
   * @param tag - The name of the HTML element to create a styled component for.
   * @returns A function that creates a styled component for the specified HTML element.
   */
  get<T extends keyof HTMLElementTagNameMap>(_: any, tag: T) {
    const cb: StyledProxy[T] = (...args) => {
      const elementClass = css(args)
      function component(props: any) {
        const _props = convertChildrenProps(props)
        let cn = _props.className
        cn = Array.isArray(cn) ? cn : [cn]
        _props.className = [...cn, elementClass]
        return createElement(tag, _props)
      }
      component.className = elementClass
      component.dotClassName = "." + elementClass
      return component
    }
    return cb
  },
})
