export const state = () => ({
  post_list: [] 
})

export const mutations = {
  add (state, blogpost) {
    state.post_list.push(blogpost)
  },
  emptyList (state){
    state.post_list = []
  }
}

export const getters = {
  get_post_list: state => {
      return state.post_list
  },
  get_post_id: state => post_id => state.post_list.find(post => post.id === post_id),

  get_post_theme: state => theme_id => state.post_list.filter(post => post.theme.id === theme_id)

}
