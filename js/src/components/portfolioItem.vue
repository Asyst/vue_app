<template>
<div class="col-sm-3">
    <div class="folio-item wow fadeInRightBig" data-wow-duration="1000ms" data-wow-delay="300ms">
    <div class="folio-image">
        <img class="img-responsive" v-bind:src="cover" alt="">
    </div>
    <div class="overlay">
        <div class="overlay-content">
            <div class="overlay-text">
                <div class="folio-info">
                    <h3>{{ caption }}</h3>
                    <p>Design, Photography</p>
                </div>
                <div class="folio-overview">
                    <span class="folio-link">
                        <router-link :to="{ name: 'portfolio', params: { id: id } }">
                            <i class="fa fa-link"></i>
                        </router-link>
                        <!-- <a class="folio-read-more" href="#" data-single_url="portfolio-single.html" ></a> -->
                    </span>
                    <span class="folio-expand">
                        <a v-bind:href="cover" data-lightbox="portfolio">
                        <i class="fa fa-search-plus"></i>
                        </a>
                    </span>
                </div>
            </div>
        </div>
    </div>
    </div>
</div>
</template>

<script>
export default {
    props: ['cover', 'caption', 'id']
}

</script>
