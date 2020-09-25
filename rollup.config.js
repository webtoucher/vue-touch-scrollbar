// rollup.config.js
import resolve from '@rollup/plugin-node-resolve'
import babel from 'rollup-plugin-babel'

export default {
    input: './src/vue-touch-scrollbar.js',
    output: {
        file: './dist/vue-touch-scrollbar.js',
        format: 'umd',
        name: 'vue-touch-scrollbar',
    },
    plugins: [
        resolve(),
        babel({
            exclude: 'node_modules/**', // only transpile our source code
        }),
    ],
}
