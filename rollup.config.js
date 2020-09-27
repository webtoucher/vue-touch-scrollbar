// rollup.config.js
import resolve from '@rollup/plugin-node-resolve'
import babel from 'rollup-plugin-babel'

export default {
    input: './src/vue-touch-scrollbox.js',
    output: {
        file: './dist/vue-touch-scrollbox.js',
        format: 'umd',
        name: 'vue-touch-scrollbox',
    },
    plugins: [
        resolve(),
        babel({
            exclude: 'node_modules/**', // only transpile our source code
        }),
    ],
}
