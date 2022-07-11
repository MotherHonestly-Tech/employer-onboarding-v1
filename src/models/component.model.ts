import React from "react"

export type Component<P = {}> = FunctionComponent<P>;

interface FunctionComponent<P> {
    (props: P & { children?: React.ReactNode }): JSX.Element;
    key?: string | number | null;
}