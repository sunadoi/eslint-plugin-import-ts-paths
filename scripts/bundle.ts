import { build, Message } from "esbuild"

const warningLog = (warning: Message[]) => {
  warning.forEach((warn) => {
    console.error("warning: ", warn.text)
    console.error("detail: ", warn.detail)
    console.error("path: ", `${warn.location?.file}:${warn.location?.line}:${warn.location?.column}`)
    console.error(" -> ", warn.location?.lineText)
  })
}

const errorLog = (errors: Message[]) => {
  errors.forEach((err) => {
    console.error("error: ", err.text)
    console.error("path: ", `${err.location?.file}:${err.location?.line}:${err.location?.column}`)
    console.error(" -> ", err.location?.lineText)
  })
}

build({
  entryPoints: ["./src/index.ts"],
  outdir: "lib",
  bundle: true,
  sourcemap: true,
  minify: process.env.NODE_ENV === "production",
  external: ["react", "react-dom"],
  splitting: true,
  format: "esm",
  target: "es2019",
  ...(process.env.NODE_ENV === "production"
    ? {}
    : {
        watch: {
          onRebuild: (error, result) => {
            console.log(error, result)
            console.log("-------------------------------")
            if (error) {
              console.error(new Date().toLocaleString(), " watch build failed ")
              if (error.warnings) warningLog(error.warnings)
              if (error.errors) errorLog(error.errors)
              return
            }
            if (result) {
              console.log(new Date().toLocaleString(), " watch build succeeded ")
              if (result.warnings) warningLog(result.warnings)
            }
          },
        },
      }),
})
