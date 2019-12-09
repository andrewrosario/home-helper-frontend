const projectType = (project_type_id) => {
    switch(project_type_id) {
        case 1:
            return 'painting';
        case 2:
            return 'plumbing';
        case 3:
            return 'electrical';
        case 4:
            return 'carpentry';
        case 5: 
            return 'flooring';
        case 6:
            return 'landscaping';
        default:
            return 'painting';
    }
}
module.exports = projectType;