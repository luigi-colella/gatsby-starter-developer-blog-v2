/* App imports */
import {
    ChildImageSharpFixed,
    ChildImageSharpFluid
} from '../src/types'

export const ImageSharpFixed: ChildImageSharpFixed = {
    fixed: {
        height: 100,
        width: 100,
        src: 'image-for-meta.png',
        srcSet: 'image-for-meta.png'
    }
}

export const ImageSharpFluid: ChildImageSharpFluid = {
    fluid: {
        aspectRatio: 1.7,
        sizes: '(max-width: 600px) 100vw, 600px',
        src: '/static/da8d0fc0af7f0d310517048e303b3fcf/a5a41/preview.jpg',
        srcSet: '/static/da8d0fc0af7f0d310517048e303b3fcf/a5a41/preview.jpg'
    }
}