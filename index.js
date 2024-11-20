const fs = require('fs').promises
const Parser = require('rss-parser')
const parser = new Parser()

const NUM_OF_ARTICLES_TO_SHOW = 5

const LASTEST_ARTICLE_PLACEHOLDER = /%{{latest_article}}%/g
const ICONS_SIZE_PLACEHOLDER = /%{{icon_size}}%/g
const ICONS_SIZE = '24px'

    ; (async () => {
        const markdownTemplate = await fs.readFile('./README.md.tpl', { encoding: 'utf-8' })
        //Final URL
        const items = await parser.parseURL('https://jlferrete.com/feed/');
        //Temporal URL
        //const items = await parser.parseURL('https://home-5015477680.webspace-host.com/wordpress/feed/');
        // put the latest article
        //const [{ title, link }] = items.items
        const latestArticlesMarkdown = items.items.slice(0, NUM_OF_ARTICLES_TO_SHOW)
            .map(({ title, link }) => `- [${title}](${link})`)
            .join('\n')
        // const latestArticleMarkdown = `[${title}](${link})`

        //replace all placeholders with info
        const newMarkdown = markdownTemplate
            .replace(LASTEST_ARTICLE_PLACEHOLDER, latestArticlesMarkdown)
            .replace(ICONS_SIZE_PLACEHOLDER, ICONS_SIZE) //put the icon size to all icons

        await fs.writeFile('./README.md', newMarkdown)


    })()


