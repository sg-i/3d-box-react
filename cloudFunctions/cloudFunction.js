module.exports.handler = async function (event, context) {
    const { length, width, height } = JSON.parse(Buffer.from(event.body, 'base64'));
    let w = width / 2;
    let h = height / 2;
    let l = length / 2;

    const vertices = [
        // front
        { pos: [-l, -h, w], norm: [0, 0, 1], uv: [0, 0] },
        { pos: [l, -h, w], norm: [0, 0, 1], uv: [1, 0] },
        { pos: [-l, h, w], norm: [0, 0, 1], uv: [0, 1] },

        { pos: [-l, h, w], norm: [0, 0, 1], uv: [0, 1] },
        { pos: [l, -h, w], norm: [0, 0, 1], uv: [1, 0] },
        { pos: [l, h, w], norm: [0, 0, 1], uv: [1, 1] },
        // right
        { pos: [l, -h, w], norm: [1, 0, 0], uv: [0, 0] },
        { pos: [l, -h, -w], norm: [1, 0, 0], uv: [1, 0] },
        { pos: [l, h, w], norm: [1, 0, 0], uv: [0, 1] },

        { pos: [l, h, w], norm: [1, 0, 0], uv: [0, 1] },
        { pos: [l, -h, -w], norm: [1, 0, 0], uv: [1, 0] },
        { pos: [l, h, -w], norm: [1, 0, 0], uv: [1, 1] },
        // back
        { pos: [l, -h, -w], norm: [0, 0, -1], uv: [0, 0] },
        { pos: [-l, -h, -w], norm: [0, 0, -1], uv: [1, 0] },
        { pos: [l, h, -w], norm: [0, 0, -1], uv: [0, 1] },

        { pos: [l, h, -w], norm: [0, 0, -1], uv: [0, 1] },
        { pos: [-l, -h, -w], norm: [0, 0, -1], uv: [1, 0] },
        { pos: [-l, h, -w], norm: [0, 0, -1], uv: [1, 1] },
        // left
        { pos: [-l, -h, -w], norm: [-1, 0, 0], uv: [0, 0] },
        { pos: [-l, -h, w], norm: [-1, 0, 0], uv: [1, 0] },
        { pos: [-l, h, -w], norm: [-1, 0, 0], uv: [0, 1] },

        { pos: [-l, h, -w], norm: [-1, 0, 0], uv: [0, 1] },
        { pos: [-l, -h, w], norm: [-1, 0, 0], uv: [1, 0] },
        { pos: [-l, h, w], norm: [-1, 0, 0], uv: [1, 1] },
        // top
        { pos: [l, h, -w], norm: [0, 1, 0], uv: [0, 0] },
        { pos: [-l, h, -w], norm: [0, 1, 0], uv: [1, 0] },
        { pos: [l, h, w], norm: [0, 1, 0], uv: [0, 1] },

        { pos: [l, h, w], norm: [0, 1, 0], uv: [0, 1] },
        { pos: [-l, h, -w], norm: [0, 1, 0], uv: [1, 0] },
        { pos: [-l, h, w], norm: [0, 1, 0], uv: [1, 1] },
        // bottom
        { pos: [l, -h, w], norm: [0, -1, 0], uv: [0, 0] },
        { pos: [-l, -h, w], norm: [0, -1, 0], uv: [1, 0] },
        { pos: [l, -h, -w], norm: [0, -1, 0], uv: [0, 1] },

        { pos: [l, -h, -w], norm: [0, -1, 0], uv: [0, 1] },
        { pos: [-l, -h, w], norm: [0, -1, 0], uv: [1, 0] },
        { pos: [-l, -h, -w], norm: [0, -1, 0], uv: [1, 1] },
    ];
    const positions = [];
    const normals = [];
    const uvs = [];
    for (const vertex of vertices) {
        positions.push(...vertex.pos);
        normals.push(...vertex.norm);
        uvs.push(...vertex.uv);
    }
    return {
        statusCode: 200,
        body: {
            positions, normals, uvs 
        },
    };
};
