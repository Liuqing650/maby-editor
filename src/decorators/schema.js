import { Text, Block } from 'slate';
import { List } from 'immutable';
import {
	CHILD_TYPE_INVALID,
	CHILD_REQUIRED,
	PARENT_TYPE_INVALID
} from 'slate-schema-violations';

const DEFAULT_NEWLINE = '\n';
// copy: https://github.com/GitbookIO/slate-edit-code
/**
 * Create a schema definition with rules to normalize code blocks
 */
function schema(opts) {
	const baseSchema = {
		blocks: {
			[opts.containerType]: {
				nodes: [{ types: [opts.lineType] }],
				normalize(change, violation, context) {
					const { node, child, index } = context;
					console.log('violation----->', violation);
					switch (violation) {
						case CHILD_TYPE_INVALID:
							return onlyLine(opts, change, context);
						default:
							return undefined;
					}
				}
			},
			[opts.lineType]: {
				nodes: [{ objects: ['text'], min: 1 }],
				parent: { types: [opts.containerType] },
				normalize(change, violation, context) {
					switch (violation) {
						case PARENT_TYPE_INVALID:
							return noOrphanLine(opts, change, context);
						default:
							return undefined;
					}
				}
			}
		}
	};

	if (!opts.allowMarks) {
		baseSchema.blocks[opts.lineType].marks = [];
	}
	return baseSchema;
}

const deserializeCode = (opts, text) => {
	const sep = DEFAULT_NEWLINE;
	let lines = [];
	List(text.split(sep)).map(line => {
			lines.push(
				Block.create({
					type: opts.lineType,
					nodes: [Text.create('')]
				})
			)
		}
	);

	const code = Block.create({
		type: opts.containerType,
		nodes: lines
	});

	return code;
}

/**
 * A rule that ensure code blocks only contain lines of code, and no marks
 */
function onlyLine(opts, change, context) {
	// 复制的时候需要重新走新的路线
	return change.withoutNormalization(c => {
		let codeLines = List();
		context.node.nodes.map(child => {
			if (child.object !== 'text') {
				return;
			}
			
			codeLines = codeLines.concat(
				deserializeCode(opts, child.text).nodes
			);
			// 会导致光标串行...
			// c.removeNodeByKey(child.key);
		});
		codeLines.forEach((codeLine, index) => {
			if (codeLine) {
				c.insertNodeByKey(context.node.key, index, codeLine);
			}
		});
		return c;
	});
}

/**
 * A rule that ensure code lines are always children
 * of a code block.
 */
function noOrphanLine(opts, change, context) {
	const codeLines = context.parent.nodes.filter(
		n => n.type === opts.lineType
	);
	return codeLines.reduce(
		(c, n) => c.wrapBlockByKey(n.key, opts.containerType),
		change
	);
}

export default schema;
