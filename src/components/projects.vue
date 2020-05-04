<template>
  <div class="container my-10">
    <g-heading caption="Projects">
      Projects I've worked on
    </g-heading>
    <div class="grid grid-cols-2 gap-3">
      <project
        v-for="{ node } in $page.projects.edges"
        :key="node.slug"
        :title="node.title"
        :logo="node.logo"
        :cover="node.cover"
      />
    </div>
  </div>
</template>

<script>
import project from "~/components/project";

export default {
  components: { project }
};
</script>

<page-query>
query Projects {
  projects: allContentfulProjects {
    edges {
      node {
        title
        slug
        website
        logo {
          file {
            url
          }
        }
        cover {
          file {
            url
          }
        }
        technologies {
          title
          logo {
            file {
              url
            }
          }
        }
      }
    }
  }
}
</page-query>
