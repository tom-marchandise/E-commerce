export const dataCategory = [
    {
        "id": 1,
        "name": "Ordinateurs",
        "inverseparent_categoryNavigation": [
            {
                "id": 2,
                "name": "Ordinateurs gaming",
                "parent_category": 1,
                "inverseparent_categoryNavigation": [
                    {
                        "id": 3,
                        "name": "Ordinateurs fixes gaming",
                        "parent_category": 2,
                        "image": "https://media.topachat.com/media/s200/662fbc45c61b6d19b7767185.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 4,
                        "name": "Ordinateurs portables gaming",
                        "parent_category": 2,
                        "image": "https://media.topachat.com/media/s200/61968b3b2572885fae2117af.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    }
                ],
                "products": []
            },
            {
                "id": 5,
                "name": "Ordinateurs bureautiques",
                "parent_category": 1,
                "inverseparent_categoryNavigation": [
                    {
                        "id": 6,
                        "name": "Ordinateurs fixes bureautiques",
                        "parent_category": 5,
                        "image": "https://media.ldlc.com/r100/ld/categories/thumbnails/4194.jpg",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 7,
                        "name": "Ordinateurs portables bureautiques",
                        "parent_category": 5,
                        "image": "https://media.topachat.com/media/s200/61968b35ce5de428735210c3.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    }
                ],
                "products": []
            }
        ],
        "products": []
    },
    {
        "id": 2,
        "name": "Ordinateurs gaming",
        "parent_category": 1,
        "parent_categoryNavigation": {
            "id": 1,
            "name": "Ordinateurs",
            "inverseparent_categoryNavigation": [
                {
                    "id": 5,
                    "name": "Ordinateurs bureautiques",
                    "parent_category": 1,
                    "inverseparent_categoryNavigation": [
                        {
                            "id": 6,
                            "name": "Ordinateurs fixes bureautiques",
                            "parent_category": 5,
                            "image": "https://media.ldlc.com/r100/ld/categories/thumbnails/4194.jpg",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 7,
                            "name": "Ordinateurs portables bureautiques",
                            "parent_category": 5,
                            "image": "https://media.topachat.com/media/s200/61968b35ce5de428735210c3.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        }
                    ],
                    "products": []
                }
            ],
            "products": []
        },
        "inverseparent_categoryNavigation": [
            {
                "id": 3,
                "name": "Ordinateurs fixes gaming",
                "parent_category": 2,
                "image": "https://media.topachat.com/media/s200/662fbc45c61b6d19b7767185.webp",
                "inverseparent_categoryNavigation": [],
                "products": []
            },
            {
                "id": 4,
                "name": "Ordinateurs portables gaming",
                "parent_category": 2,
                "image": "https://media.topachat.com/media/s200/61968b3b2572885fae2117af.webp",
                "inverseparent_categoryNavigation": [],
                "products": []
            }
        ],
        "products": []
    },
    {
        "id": 3,
        "name": "Ordinateurs fixes gaming",
        "parent_category": 2,
        "image": "https://media.topachat.com/media/s200/662fbc45c61b6d19b7767185.webp",
        "parent_categoryNavigation": {
            "id": 2,
            "name": "Ordinateurs gaming",
            "parent_category": 1,
            "parent_categoryNavigation": {
                "id": 1,
                "name": "Ordinateurs",
                "inverseparent_categoryNavigation": [
                    {
                        "id": 5,
                        "name": "Ordinateurs bureautiques",
                        "parent_category": 1,
                        "inverseparent_categoryNavigation": [
                            {
                                "id": 6,
                                "name": "Ordinateurs fixes bureautiques",
                                "parent_category": 5,
                                "image": "https://media.ldlc.com/r100/ld/categories/thumbnails/4194.jpg",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 7,
                                "name": "Ordinateurs portables bureautiques",
                                "parent_category": 5,
                                "image": "https://media.topachat.com/media/s200/61968b35ce5de428735210c3.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            }
                        ],
                        "products": []
                    }
                ],
                "products": []
            },
            "inverseparent_categoryNavigation": [
                {
                    "id": 4,
                    "name": "Ordinateurs portables gaming",
                    "parent_category": 2,
                    "image": "https://media.topachat.com/media/s200/61968b3b2572885fae2117af.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                }
            ],
            "products": []
        },
        "inverseparent_categoryNavigation": [],
        "products": []
    },
    {
        "id": 4,
        "name": "Ordinateurs portables gaming",
        "parent_category": 2,
        "image": "https://media.topachat.com/media/s200/61968b3b2572885fae2117af.webp",
        "parent_categoryNavigation": {
            "id": 2,
            "name": "Ordinateurs gaming",
            "parent_category": 1,
            "parent_categoryNavigation": {
                "id": 1,
                "name": "Ordinateurs",
                "inverseparent_categoryNavigation": [
                    {
                        "id": 5,
                        "name": "Ordinateurs bureautiques",
                        "parent_category": 1,
                        "inverseparent_categoryNavigation": [
                            {
                                "id": 6,
                                "name": "Ordinateurs fixes bureautiques",
                                "parent_category": 5,
                                "image": "https://media.ldlc.com/r100/ld/categories/thumbnails/4194.jpg",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 7,
                                "name": "Ordinateurs portables bureautiques",
                                "parent_category": 5,
                                "image": "https://media.topachat.com/media/s200/61968b35ce5de428735210c3.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            }
                        ],
                        "products": []
                    }
                ],
                "products": []
            },
            "inverseparent_categoryNavigation": [
                {
                    "id": 3,
                    "name": "Ordinateurs fixes gaming",
                    "parent_category": 2,
                    "image": "https://media.topachat.com/media/s200/662fbc45c61b6d19b7767185.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                }
            ],
            "products": []
        },
        "inverseparent_categoryNavigation": [],
        "products": []
    },
    {
        "id": 5,
        "name": "Ordinateurs bureautiques",
        "parent_category": 1,
        "parent_categoryNavigation": {
            "id": 1,
            "name": "Ordinateurs",
            "inverseparent_categoryNavigation": [
                {
                    "id": 2,
                    "name": "Ordinateurs gaming",
                    "parent_category": 1,
                    "inverseparent_categoryNavigation": [
                        {
                            "id": 3,
                            "name": "Ordinateurs fixes gaming",
                            "parent_category": 2,
                            "image": "https://media.topachat.com/media/s200/662fbc45c61b6d19b7767185.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 4,
                            "name": "Ordinateurs portables gaming",
                            "parent_category": 2,
                            "image": "https://media.topachat.com/media/s200/61968b3b2572885fae2117af.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        }
                    ],
                    "products": []
                }
            ],
            "products": []
        },
        "inverseparent_categoryNavigation": [
            {
                "id": 6,
                "name": "Ordinateurs fixes bureautiques",
                "parent_category": 5,
                "image": "https://media.ldlc.com/r100/ld/categories/thumbnails/4194.jpg",
                "inverseparent_categoryNavigation": [],
                "products": []
            },
            {
                "id": 7,
                "name": "Ordinateurs portables bureautiques",
                "parent_category": 5,
                "image": "https://media.topachat.com/media/s200/61968b35ce5de428735210c3.webp",
                "inverseparent_categoryNavigation": [],
                "products": []
            }
        ],
        "products": []
    },
    {
        "id": 6,
        "name": "Ordinateurs fixes bureautiques",
        "parent_category": 5,
        "image": "https://media.ldlc.com/r100/ld/categories/thumbnails/4194.jpg",
        "parent_categoryNavigation": {
            "id": 5,
            "name": "Ordinateurs bureautiques",
            "parent_category": 1,
            "parent_categoryNavigation": {
                "id": 1,
                "name": "Ordinateurs",
                "inverseparent_categoryNavigation": [
                    {
                        "id": 2,
                        "name": "Ordinateurs gaming",
                        "parent_category": 1,
                        "inverseparent_categoryNavigation": [
                            {
                                "id": 3,
                                "name": "Ordinateurs fixes gaming",
                                "parent_category": 2,
                                "image": "https://media.topachat.com/media/s200/662fbc45c61b6d19b7767185.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 4,
                                "name": "Ordinateurs portables gaming",
                                "parent_category": 2,
                                "image": "https://media.topachat.com/media/s200/61968b3b2572885fae2117af.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            }
                        ],
                        "products": []
                    }
                ],
                "products": []
            },
            "inverseparent_categoryNavigation": [
                {
                    "id": 7,
                    "name": "Ordinateurs portables bureautiques",
                    "parent_category": 5,
                    "image": "https://media.topachat.com/media/s200/61968b35ce5de428735210c3.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                }
            ],
            "products": []
        },
        "inverseparent_categoryNavigation": [],
        "products": []
    },
    {
        "id": 7,
        "name": "Ordinateurs portables bureautiques",
        "parent_category": 5,
        "image": "https://media.topachat.com/media/s200/61968b35ce5de428735210c3.webp",
        "parent_categoryNavigation": {
            "id": 5,
            "name": "Ordinateurs bureautiques",
            "parent_category": 1,
            "parent_categoryNavigation": {
                "id": 1,
                "name": "Ordinateurs",
                "inverseparent_categoryNavigation": [
                    {
                        "id": 2,
                        "name": "Ordinateurs gaming",
                        "parent_category": 1,
                        "inverseparent_categoryNavigation": [
                            {
                                "id": 3,
                                "name": "Ordinateurs fixes gaming",
                                "parent_category": 2,
                                "image": "https://media.topachat.com/media/s200/662fbc45c61b6d19b7767185.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 4,
                                "name": "Ordinateurs portables gaming",
                                "parent_category": 2,
                                "image": "https://media.topachat.com/media/s200/61968b3b2572885fae2117af.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            }
                        ],
                        "products": []
                    }
                ],
                "products": []
            },
            "inverseparent_categoryNavigation": [
                {
                    "id": 6,
                    "name": "Ordinateurs fixes bureautiques",
                    "parent_category": 5,
                    "image": "https://media.ldlc.com/r100/ld/categories/thumbnails/4194.jpg",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                }
            ],
            "products": []
        },
        "inverseparent_categoryNavigation": [],
        "products": []
    },
    {
        "id": 8,
        "name": "Composants",
        "inverseparent_categoryNavigation": [
            {
                "id": 9,
                "name": "Refroidissements",
                "parent_category": 8,
                "image": "https://media.topachat.com/media/s200/619e3ffea2cec2241f84a25a.webp",
                "inverseparent_categoryNavigation": [
                    {
                        "id": 10,
                        "name": "Ventirads",
                        "parent_category": 9,
                        "image": "https://media.topachat.com/media/s200/619e42d6a2cec2241f84e5a9.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 11,
                        "name": "Watercoolings",
                        "parent_category": 9,
                        "image": "https://media.topachat.com/media/s200/619e42232572885fae307ae0.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 12,
                        "name": "Ventilateurs",
                        "parent_category": 9,
                        "image": "https://media.topachat.com/media/s200/619e44ff2572885fae30c089.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    }
                ],
                "products": []
            },
            {
                "id": 13,
                "name": "Stockage",
                "parent_category": 8,
                "image": "https://media.topachat.com/media/s200/619e427fa2cec2241f84df58.webp",
                "inverseparent_categoryNavigation": [
                    {
                        "id": 14,
                        "name": "Disques durs",
                        "parent_category": 13,
                        "image": "https://media.topachat.com/media/s200/63d281db3bf7f810d52d1910.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 15,
                        "name": "SSD sata",
                        "parent_category": 13,
                        "image": "https://media.topachat.com/media/s200/619e427fa2cec2241f84df58.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 16,
                        "name": "SSD NVME",
                        "parent_category": 13,
                        "image": "https://media.topachat.com/media/s200/63c8207dfa59406f2339afe7.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    }
                ],
                "products": []
            },
            {
                "id": 17,
                "name": "RAM",
                "parent_category": 8,
                "image": "https://media.topachat.com/media/s200/619e4399a2cec2241f84f504.webp",
                "inverseparent_categoryNavigation": [
                    {
                        "id": 18,
                        "name": "RAM DDR3",
                        "parent_category": 17,
                        "image": "https://media.topachat.com/media/s200/619e3e912572885fae3024d0.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 19,
                        "name": "RAM DDR4",
                        "parent_category": 17,
                        "image": "https://media.topachat.com/media/s200/619e4012a2cec2241f84a48d.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 20,
                        "name": "RAM DDR5",
                        "parent_category": 17,
                        "image": "https://media.topachat.com/media/s200/62a899e962f3ec1ddc576e90.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    }
                ],
                "products": []
            },
            {
                "id": 21,
                "name": "Cartes mères",
                "parent_category": 8,
                "image": "https://media.topachat.com/media/s200/634681b99a50ae7fa9118c27.webp",
                "inverseparent_categoryNavigation": [],
                "products": []
            },
            {
                "id": 22,
                "name": "Cartes graphiques",
                "parent_category": 8,
                "image": "https://media.topachat.com/media/s200/63a195da2c6d90678a6b9f93.webp",
                "inverseparent_categoryNavigation": [],
                "products": []
            },
            {
                "id": 23,
                "name": "Processeurs",
                "parent_category": 8,
                "image": "https://media.topachat.com/media/s200/668508d9fa318e0ab07457a2.webp",
                "inverseparent_categoryNavigation": [],
                "products": []
            },
            {
                "id": 24,
                "name": "Alimentations",
                "parent_category": 8,
                "image": "https://media.topachat.com/media/s200/64102401c28a214e017b9454.webp",
                "inverseparent_categoryNavigation": [],
                "products": []
            },
            {
                "id": 25,
                "name": "Pâtes thermiques",
                "parent_category": 8,
                "image": "https://media.topachat.com/media/s200/619e40c12572885fae304da6.webp",
                "inverseparent_categoryNavigation": [],
                "products": []
            }
        ],
        "products": []
    },
    {
        "id": 9,
        "name": "Refroidissements",
        "parent_category": 8,
        "image": "https://media.topachat.com/media/s200/619e3ffea2cec2241f84a25a.webp",
        "parent_categoryNavigation": {
            "id": 8,
            "name": "Composants",
            "inverseparent_categoryNavigation": [
                {
                    "id": 13,
                    "name": "Stockage",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/619e427fa2cec2241f84df58.webp",
                    "inverseparent_categoryNavigation": [
                        {
                            "id": 14,
                            "name": "Disques durs",
                            "parent_category": 13,
                            "image": "https://media.topachat.com/media/s200/63d281db3bf7f810d52d1910.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 15,
                            "name": "SSD sata",
                            "parent_category": 13,
                            "image": "https://media.topachat.com/media/s200/619e427fa2cec2241f84df58.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 16,
                            "name": "SSD NVME",
                            "parent_category": 13,
                            "image": "https://media.topachat.com/media/s200/63c8207dfa59406f2339afe7.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        }
                    ],
                    "products": []
                },
                {
                    "id": 17,
                    "name": "RAM",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/619e4399a2cec2241f84f504.webp",
                    "inverseparent_categoryNavigation": [
                        {
                            "id": 18,
                            "name": "RAM DDR3",
                            "parent_category": 17,
                            "image": "https://media.topachat.com/media/s200/619e3e912572885fae3024d0.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 19,
                            "name": "RAM DDR4",
                            "parent_category": 17,
                            "image": "https://media.topachat.com/media/s200/619e4012a2cec2241f84a48d.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 20,
                            "name": "RAM DDR5",
                            "parent_category": 17,
                            "image": "https://media.topachat.com/media/s200/62a899e962f3ec1ddc576e90.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        }
                    ],
                    "products": []
                },
                {
                    "id": 21,
                    "name": "Cartes mères",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/634681b99a50ae7fa9118c27.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 22,
                    "name": "Cartes graphiques",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/63a195da2c6d90678a6b9f93.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 23,
                    "name": "Processeurs",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/668508d9fa318e0ab07457a2.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 24,
                    "name": "Alimentations",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/64102401c28a214e017b9454.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 25,
                    "name": "Pâtes thermiques",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/619e40c12572885fae304da6.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                }
            ],
            "products": []
        },
        "inverseparent_categoryNavigation": [
            {
                "id": 10,
                "name": "Ventirads",
                "parent_category": 9,
                "image": "https://media.topachat.com/media/s200/619e42d6a2cec2241f84e5a9.webp",
                "inverseparent_categoryNavigation": [],
                "products": []
            },
            {
                "id": 11,
                "name": "Watercoolings",
                "parent_category": 9,
                "image": "https://media.topachat.com/media/s200/619e42232572885fae307ae0.webp",
                "inverseparent_categoryNavigation": [],
                "products": []
            },
            {
                "id": 12,
                "name": "Ventilateurs",
                "parent_category": 9,
                "image": "https://media.topachat.com/media/s200/619e44ff2572885fae30c089.webp",
                "inverseparent_categoryNavigation": [],
                "products": []
            }
        ],
        "products": []
    },
    {
        "id": 10,
        "name": "Ventirads",
        "parent_category": 9,
        "image": "https://media.topachat.com/media/s200/619e42d6a2cec2241f84e5a9.webp",
        "parent_categoryNavigation": {
            "id": 9,
            "name": "Refroidissements",
            "parent_category": 8,
            "image": "https://media.topachat.com/media/s200/619e3ffea2cec2241f84a25a.webp",
            "parent_categoryNavigation": {
                "id": 8,
                "name": "Composants",
                "inverseparent_categoryNavigation": [
                    {
                        "id": 13,
                        "name": "Stockage",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/619e427fa2cec2241f84df58.webp",
                        "inverseparent_categoryNavigation": [
                            {
                                "id": 14,
                                "name": "Disques durs",
                                "parent_category": 13,
                                "image": "https://media.topachat.com/media/s200/63d281db3bf7f810d52d1910.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 15,
                                "name": "SSD sata",
                                "parent_category": 13,
                                "image": "https://media.topachat.com/media/s200/619e427fa2cec2241f84df58.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 16,
                                "name": "SSD NVME",
                                "parent_category": 13,
                                "image": "https://media.topachat.com/media/s200/63c8207dfa59406f2339afe7.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            }
                        ],
                        "products": []
                    },
                    {
                        "id": 17,
                        "name": "RAM",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/619e4399a2cec2241f84f504.webp",
                        "inverseparent_categoryNavigation": [
                            {
                                "id": 18,
                                "name": "RAM DDR3",
                                "parent_category": 17,
                                "image": "https://media.topachat.com/media/s200/619e3e912572885fae3024d0.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 19,
                                "name": "RAM DDR4",
                                "parent_category": 17,
                                "image": "https://media.topachat.com/media/s200/619e4012a2cec2241f84a48d.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 20,
                                "name": "RAM DDR5",
                                "parent_category": 17,
                                "image": "https://media.topachat.com/media/s200/62a899e962f3ec1ddc576e90.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            }
                        ],
                        "products": []
                    },
                    {
                        "id": 21,
                        "name": "Cartes mères",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/634681b99a50ae7fa9118c27.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 22,
                        "name": "Cartes graphiques",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/63a195da2c6d90678a6b9f93.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 23,
                        "name": "Processeurs",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/668508d9fa318e0ab07457a2.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 24,
                        "name": "Alimentations",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/64102401c28a214e017b9454.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 25,
                        "name": "Pâtes thermiques",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/619e40c12572885fae304da6.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    }
                ],
                "products": []
            },
            "inverseparent_categoryNavigation": [
                {
                    "id": 11,
                    "name": "Watercoolings",
                    "parent_category": 9,
                    "image": "https://media.topachat.com/media/s200/619e42232572885fae307ae0.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 12,
                    "name": "Ventilateurs",
                    "parent_category": 9,
                    "image": "https://media.topachat.com/media/s200/619e44ff2572885fae30c089.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                }
            ],
            "products": []
        },
        "inverseparent_categoryNavigation": [],
        "products": []
    },
    {
        "id": 11,
        "name": "Watercoolings",
        "parent_category": 9,
        "image": "https://media.topachat.com/media/s200/619e42232572885fae307ae0.webp",
        "parent_categoryNavigation": {
            "id": 9,
            "name": "Refroidissements",
            "parent_category": 8,
            "image": "https://media.topachat.com/media/s200/619e3ffea2cec2241f84a25a.webp",
            "parent_categoryNavigation": {
                "id": 8,
                "name": "Composants",
                "inverseparent_categoryNavigation": [
                    {
                        "id": 13,
                        "name": "Stockage",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/619e427fa2cec2241f84df58.webp",
                        "inverseparent_categoryNavigation": [
                            {
                                "id": 14,
                                "name": "Disques durs",
                                "parent_category": 13,
                                "image": "https://media.topachat.com/media/s200/63d281db3bf7f810d52d1910.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 15,
                                "name": "SSD sata",
                                "parent_category": 13,
                                "image": "https://media.topachat.com/media/s200/619e427fa2cec2241f84df58.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 16,
                                "name": "SSD NVME",
                                "parent_category": 13,
                                "image": "https://media.topachat.com/media/s200/63c8207dfa59406f2339afe7.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            }
                        ],
                        "products": []
                    },
                    {
                        "id": 17,
                        "name": "RAM",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/619e4399a2cec2241f84f504.webp",
                        "inverseparent_categoryNavigation": [
                            {
                                "id": 18,
                                "name": "RAM DDR3",
                                "parent_category": 17,
                                "image": "https://media.topachat.com/media/s200/619e3e912572885fae3024d0.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 19,
                                "name": "RAM DDR4",
                                "parent_category": 17,
                                "image": "https://media.topachat.com/media/s200/619e4012a2cec2241f84a48d.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 20,
                                "name": "RAM DDR5",
                                "parent_category": 17,
                                "image": "https://media.topachat.com/media/s200/62a899e962f3ec1ddc576e90.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            }
                        ],
                        "products": []
                    },
                    {
                        "id": 21,
                        "name": "Cartes mères",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/634681b99a50ae7fa9118c27.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 22,
                        "name": "Cartes graphiques",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/63a195da2c6d90678a6b9f93.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 23,
                        "name": "Processeurs",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/668508d9fa318e0ab07457a2.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 24,
                        "name": "Alimentations",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/64102401c28a214e017b9454.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 25,
                        "name": "Pâtes thermiques",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/619e40c12572885fae304da6.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    }
                ],
                "products": []
            },
            "inverseparent_categoryNavigation": [
                {
                    "id": 10,
                    "name": "Ventirads",
                    "parent_category": 9,
                    "image": "https://media.topachat.com/media/s200/619e42d6a2cec2241f84e5a9.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 12,
                    "name": "Ventilateurs",
                    "parent_category": 9,
                    "image": "https://media.topachat.com/media/s200/619e44ff2572885fae30c089.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                }
            ],
            "products": []
        },
        "inverseparent_categoryNavigation": [],
        "products": []
    },
    {
        "id": 12,
        "name": "Ventilateurs",
        "parent_category": 9,
        "image": "https://media.topachat.com/media/s200/619e44ff2572885fae30c089.webp",
        "parent_categoryNavigation": {
            "id": 9,
            "name": "Refroidissements",
            "parent_category": 8,
            "image": "https://media.topachat.com/media/s200/619e3ffea2cec2241f84a25a.webp",
            "parent_categoryNavigation": {
                "id": 8,
                "name": "Composants",
                "inverseparent_categoryNavigation": [
                    {
                        "id": 13,
                        "name": "Stockage",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/619e427fa2cec2241f84df58.webp",
                        "inverseparent_categoryNavigation": [
                            {
                                "id": 14,
                                "name": "Disques durs",
                                "parent_category": 13,
                                "image": "https://media.topachat.com/media/s200/63d281db3bf7f810d52d1910.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 15,
                                "name": "SSD sata",
                                "parent_category": 13,
                                "image": "https://media.topachat.com/media/s200/619e427fa2cec2241f84df58.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 16,
                                "name": "SSD NVME",
                                "parent_category": 13,
                                "image": "https://media.topachat.com/media/s200/63c8207dfa59406f2339afe7.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            }
                        ],
                        "products": []
                    },
                    {
                        "id": 17,
                        "name": "RAM",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/619e4399a2cec2241f84f504.webp",
                        "inverseparent_categoryNavigation": [
                            {
                                "id": 18,
                                "name": "RAM DDR3",
                                "parent_category": 17,
                                "image": "https://media.topachat.com/media/s200/619e3e912572885fae3024d0.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 19,
                                "name": "RAM DDR4",
                                "parent_category": 17,
                                "image": "https://media.topachat.com/media/s200/619e4012a2cec2241f84a48d.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 20,
                                "name": "RAM DDR5",
                                "parent_category": 17,
                                "image": "https://media.topachat.com/media/s200/62a899e962f3ec1ddc576e90.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            }
                        ],
                        "products": []
                    },
                    {
                        "id": 21,
                        "name": "Cartes mères",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/634681b99a50ae7fa9118c27.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 22,
                        "name": "Cartes graphiques",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/63a195da2c6d90678a6b9f93.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 23,
                        "name": "Processeurs",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/668508d9fa318e0ab07457a2.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 24,
                        "name": "Alimentations",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/64102401c28a214e017b9454.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 25,
                        "name": "Pâtes thermiques",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/619e40c12572885fae304da6.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    }
                ],
                "products": []
            },
            "inverseparent_categoryNavigation": [
                {
                    "id": 10,
                    "name": "Ventirads",
                    "parent_category": 9,
                    "image": "https://media.topachat.com/media/s200/619e42d6a2cec2241f84e5a9.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 11,
                    "name": "Watercoolings",
                    "parent_category": 9,
                    "image": "https://media.topachat.com/media/s200/619e42232572885fae307ae0.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                }
            ],
            "products": []
        },
        "inverseparent_categoryNavigation": [],
        "products": []
    },
    {
        "id": 13,
        "name": "Stockage",
        "parent_category": 8,
        "image": "https://media.topachat.com/media/s200/619e427fa2cec2241f84df58.webp",
        "parent_categoryNavigation": {
            "id": 8,
            "name": "Composants",
            "inverseparent_categoryNavigation": [
                {
                    "id": 9,
                    "name": "Refroidissements",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/619e3ffea2cec2241f84a25a.webp",
                    "inverseparent_categoryNavigation": [
                        {
                            "id": 10,
                            "name": "Ventirads",
                            "parent_category": 9,
                            "image": "https://media.topachat.com/media/s200/619e42d6a2cec2241f84e5a9.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 11,
                            "name": "Watercoolings",
                            "parent_category": 9,
                            "image": "https://media.topachat.com/media/s200/619e42232572885fae307ae0.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 12,
                            "name": "Ventilateurs",
                            "parent_category": 9,
                            "image": "https://media.topachat.com/media/s200/619e44ff2572885fae30c089.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        }
                    ],
                    "products": []
                },
                {
                    "id": 17,
                    "name": "RAM",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/619e4399a2cec2241f84f504.webp",
                    "inverseparent_categoryNavigation": [
                        {
                            "id": 18,
                            "name": "RAM DDR3",
                            "parent_category": 17,
                            "image": "https://media.topachat.com/media/s200/619e3e912572885fae3024d0.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 19,
                            "name": "RAM DDR4",
                            "parent_category": 17,
                            "image": "https://media.topachat.com/media/s200/619e4012a2cec2241f84a48d.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 20,
                            "name": "RAM DDR5",
                            "parent_category": 17,
                            "image": "https://media.topachat.com/media/s200/62a899e962f3ec1ddc576e90.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        }
                    ],
                    "products": []
                },
                {
                    "id": 21,
                    "name": "Cartes mères",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/634681b99a50ae7fa9118c27.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 22,
                    "name": "Cartes graphiques",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/63a195da2c6d90678a6b9f93.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 23,
                    "name": "Processeurs",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/668508d9fa318e0ab07457a2.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 24,
                    "name": "Alimentations",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/64102401c28a214e017b9454.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 25,
                    "name": "Pâtes thermiques",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/619e40c12572885fae304da6.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                }
            ],
            "products": []
        },
        "inverseparent_categoryNavigation": [
            {
                "id": 14,
                "name": "Disques durs",
                "parent_category": 13,
                "image": "https://media.topachat.com/media/s200/63d281db3bf7f810d52d1910.webp",
                "inverseparent_categoryNavigation": [],
                "products": []
            },
            {
                "id": 15,
                "name": "SSD sata",
                "parent_category": 13,
                "image": "https://media.topachat.com/media/s200/619e427fa2cec2241f84df58.webp",
                "inverseparent_categoryNavigation": [],
                "products": []
            },
            {
                "id": 16,
                "name": "SSD NVME",
                "parent_category": 13,
                "image": "https://media.topachat.com/media/s200/63c8207dfa59406f2339afe7.webp",
                "inverseparent_categoryNavigation": [],
                "products": []
            }
        ],
        "products": []
    },
    {
        "id": 14,
        "name": "Disques durs",
        "parent_category": 13,
        "image": "https://media.topachat.com/media/s200/63d281db3bf7f810d52d1910.webp",
        "parent_categoryNavigation": {
            "id": 13,
            "name": "Stockage",
            "parent_category": 8,
            "image": "https://media.topachat.com/media/s200/619e427fa2cec2241f84df58.webp",
            "parent_categoryNavigation": {
                "id": 8,
                "name": "Composants",
                "inverseparent_categoryNavigation": [
                    {
                        "id": 9,
                        "name": "Refroidissements",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/619e3ffea2cec2241f84a25a.webp",
                        "inverseparent_categoryNavigation": [
                            {
                                "id": 10,
                                "name": "Ventirads",
                                "parent_category": 9,
                                "image": "https://media.topachat.com/media/s200/619e42d6a2cec2241f84e5a9.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 11,
                                "name": "Watercoolings",
                                "parent_category": 9,
                                "image": "https://media.topachat.com/media/s200/619e42232572885fae307ae0.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 12,
                                "name": "Ventilateurs",
                                "parent_category": 9,
                                "image": "https://media.topachat.com/media/s200/619e44ff2572885fae30c089.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            }
                        ],
                        "products": []
                    },
                    {
                        "id": 17,
                        "name": "RAM",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/619e4399a2cec2241f84f504.webp",
                        "inverseparent_categoryNavigation": [
                            {
                                "id": 18,
                                "name": "RAM DDR3",
                                "parent_category": 17,
                                "image": "https://media.topachat.com/media/s200/619e3e912572885fae3024d0.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 19,
                                "name": "RAM DDR4",
                                "parent_category": 17,
                                "image": "https://media.topachat.com/media/s200/619e4012a2cec2241f84a48d.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 20,
                                "name": "RAM DDR5",
                                "parent_category": 17,
                                "image": "https://media.topachat.com/media/s200/62a899e962f3ec1ddc576e90.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            }
                        ],
                        "products": []
                    },
                    {
                        "id": 21,
                        "name": "Cartes mères",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/634681b99a50ae7fa9118c27.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 22,
                        "name": "Cartes graphiques",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/63a195da2c6d90678a6b9f93.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 23,
                        "name": "Processeurs",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/668508d9fa318e0ab07457a2.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 24,
                        "name": "Alimentations",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/64102401c28a214e017b9454.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 25,
                        "name": "Pâtes thermiques",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/619e40c12572885fae304da6.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    }
                ],
                "products": []
            },
            "inverseparent_categoryNavigation": [
                {
                    "id": 15,
                    "name": "SSD sata",
                    "parent_category": 13,
                    "image": "https://media.topachat.com/media/s200/619e427fa2cec2241f84df58.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 16,
                    "name": "SSD NVME",
                    "parent_category": 13,
                    "image": "https://media.topachat.com/media/s200/63c8207dfa59406f2339afe7.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                }
            ],
            "products": []
        },
        "inverseparent_categoryNavigation": [],
        "products": []
    },
    {
        "id": 15,
        "name": "SSD sata",
        "parent_category": 13,
        "image": "https://media.topachat.com/media/s200/619e427fa2cec2241f84df58.webp",
        "parent_categoryNavigation": {
            "id": 13,
            "name": "Stockage",
            "parent_category": 8,
            "image": "https://media.topachat.com/media/s200/619e427fa2cec2241f84df58.webp",
            "parent_categoryNavigation": {
                "id": 8,
                "name": "Composants",
                "inverseparent_categoryNavigation": [
                    {
                        "id": 9,
                        "name": "Refroidissements",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/619e3ffea2cec2241f84a25a.webp",
                        "inverseparent_categoryNavigation": [
                            {
                                "id": 10,
                                "name": "Ventirads",
                                "parent_category": 9,
                                "image": "https://media.topachat.com/media/s200/619e42d6a2cec2241f84e5a9.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 11,
                                "name": "Watercoolings",
                                "parent_category": 9,
                                "image": "https://media.topachat.com/media/s200/619e42232572885fae307ae0.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 12,
                                "name": "Ventilateurs",
                                "parent_category": 9,
                                "image": "https://media.topachat.com/media/s200/619e44ff2572885fae30c089.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            }
                        ],
                        "products": []
                    },
                    {
                        "id": 17,
                        "name": "RAM",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/619e4399a2cec2241f84f504.webp",
                        "inverseparent_categoryNavigation": [
                            {
                                "id": 18,
                                "name": "RAM DDR3",
                                "parent_category": 17,
                                "image": "https://media.topachat.com/media/s200/619e3e912572885fae3024d0.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 19,
                                "name": "RAM DDR4",
                                "parent_category": 17,
                                "image": "https://media.topachat.com/media/s200/619e4012a2cec2241f84a48d.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 20,
                                "name": "RAM DDR5",
                                "parent_category": 17,
                                "image": "https://media.topachat.com/media/s200/62a899e962f3ec1ddc576e90.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            }
                        ],
                        "products": []
                    },
                    {
                        "id": 21,
                        "name": "Cartes mères",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/634681b99a50ae7fa9118c27.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 22,
                        "name": "Cartes graphiques",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/63a195da2c6d90678a6b9f93.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 23,
                        "name": "Processeurs",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/668508d9fa318e0ab07457a2.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 24,
                        "name": "Alimentations",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/64102401c28a214e017b9454.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 25,
                        "name": "Pâtes thermiques",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/619e40c12572885fae304da6.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    }
                ],
                "products": []
            },
            "inverseparent_categoryNavigation": [
                {
                    "id": 14,
                    "name": "Disques durs",
                    "parent_category": 13,
                    "image": "https://media.topachat.com/media/s200/63d281db3bf7f810d52d1910.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 16,
                    "name": "SSD NVME",
                    "parent_category": 13,
                    "image": "https://media.topachat.com/media/s200/63c8207dfa59406f2339afe7.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                }
            ],
            "products": []
        },
        "inverseparent_categoryNavigation": [],
        "products": []
    },
    {
        "id": 16,
        "name": "SSD NVME",
        "parent_category": 13,
        "image": "https://media.topachat.com/media/s200/63c8207dfa59406f2339afe7.webp",
        "parent_categoryNavigation": {
            "id": 13,
            "name": "Stockage",
            "parent_category": 8,
            "image": "https://media.topachat.com/media/s200/619e427fa2cec2241f84df58.webp",
            "parent_categoryNavigation": {
                "id": 8,
                "name": "Composants",
                "inverseparent_categoryNavigation": [
                    {
                        "id": 9,
                        "name": "Refroidissements",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/619e3ffea2cec2241f84a25a.webp",
                        "inverseparent_categoryNavigation": [
                            {
                                "id": 10,
                                "name": "Ventirads",
                                "parent_category": 9,
                                "image": "https://media.topachat.com/media/s200/619e42d6a2cec2241f84e5a9.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 11,
                                "name": "Watercoolings",
                                "parent_category": 9,
                                "image": "https://media.topachat.com/media/s200/619e42232572885fae307ae0.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 12,
                                "name": "Ventilateurs",
                                "parent_category": 9,
                                "image": "https://media.topachat.com/media/s200/619e44ff2572885fae30c089.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            }
                        ],
                        "products": []
                    },
                    {
                        "id": 17,
                        "name": "RAM",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/619e4399a2cec2241f84f504.webp",
                        "inverseparent_categoryNavigation": [
                            {
                                "id": 18,
                                "name": "RAM DDR3",
                                "parent_category": 17,
                                "image": "https://media.topachat.com/media/s200/619e3e912572885fae3024d0.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 19,
                                "name": "RAM DDR4",
                                "parent_category": 17,
                                "image": "https://media.topachat.com/media/s200/619e4012a2cec2241f84a48d.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 20,
                                "name": "RAM DDR5",
                                "parent_category": 17,
                                "image": "https://media.topachat.com/media/s200/62a899e962f3ec1ddc576e90.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            }
                        ],
                        "products": []
                    },
                    {
                        "id": 21,
                        "name": "Cartes mères",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/634681b99a50ae7fa9118c27.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 22,
                        "name": "Cartes graphiques",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/63a195da2c6d90678a6b9f93.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 23,
                        "name": "Processeurs",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/668508d9fa318e0ab07457a2.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 24,
                        "name": "Alimentations",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/64102401c28a214e017b9454.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 25,
                        "name": "Pâtes thermiques",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/619e40c12572885fae304da6.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    }
                ],
                "products": []
            },
            "inverseparent_categoryNavigation": [
                {
                    "id": 14,
                    "name": "Disques durs",
                    "parent_category": 13,
                    "image": "https://media.topachat.com/media/s200/63d281db3bf7f810d52d1910.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 15,
                    "name": "SSD sata",
                    "parent_category": 13,
                    "image": "https://media.topachat.com/media/s200/619e427fa2cec2241f84df58.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                }
            ],
            "products": []
        },
        "inverseparent_categoryNavigation": [],
        "products": []
    },
    {
        "id": 17,
        "name": "RAM",
        "parent_category": 8,
        "image": "https://media.topachat.com/media/s200/619e4399a2cec2241f84f504.webp",
        "parent_categoryNavigation": {
            "id": 8,
            "name": "Composants",
            "inverseparent_categoryNavigation": [
                {
                    "id": 9,
                    "name": "Refroidissements",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/619e3ffea2cec2241f84a25a.webp",
                    "inverseparent_categoryNavigation": [
                        {
                            "id": 10,
                            "name": "Ventirads",
                            "parent_category": 9,
                            "image": "https://media.topachat.com/media/s200/619e42d6a2cec2241f84e5a9.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 11,
                            "name": "Watercoolings",
                            "parent_category": 9,
                            "image": "https://media.topachat.com/media/s200/619e42232572885fae307ae0.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 12,
                            "name": "Ventilateurs",
                            "parent_category": 9,
                            "image": "https://media.topachat.com/media/s200/619e44ff2572885fae30c089.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        }
                    ],
                    "products": []
                },
                {
                    "id": 13,
                    "name": "Stockage",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/619e427fa2cec2241f84df58.webp",
                    "inverseparent_categoryNavigation": [
                        {
                            "id": 14,
                            "name": "Disques durs",
                            "parent_category": 13,
                            "image": "https://media.topachat.com/media/s200/63d281db3bf7f810d52d1910.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 15,
                            "name": "SSD sata",
                            "parent_category": 13,
                            "image": "https://media.topachat.com/media/s200/619e427fa2cec2241f84df58.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 16,
                            "name": "SSD NVME",
                            "parent_category": 13,
                            "image": "https://media.topachat.com/media/s200/63c8207dfa59406f2339afe7.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        }
                    ],
                    "products": []
                },
                {
                    "id": 21,
                    "name": "Cartes mères",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/634681b99a50ae7fa9118c27.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 22,
                    "name": "Cartes graphiques",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/63a195da2c6d90678a6b9f93.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 23,
                    "name": "Processeurs",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/668508d9fa318e0ab07457a2.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 24,
                    "name": "Alimentations",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/64102401c28a214e017b9454.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 25,
                    "name": "Pâtes thermiques",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/619e40c12572885fae304da6.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                }
            ],
            "products": []
        },
        "inverseparent_categoryNavigation": [
            {
                "id": 18,
                "name": "RAM DDR3",
                "parent_category": 17,
                "image": "https://media.topachat.com/media/s200/619e3e912572885fae3024d0.webp",
                "inverseparent_categoryNavigation": [],
                "products": []
            },
            {
                "id": 19,
                "name": "RAM DDR4",
                "parent_category": 17,
                "image": "https://media.topachat.com/media/s200/619e4012a2cec2241f84a48d.webp",
                "inverseparent_categoryNavigation": [],
                "products": []
            },
            {
                "id": 20,
                "name": "RAM DDR5",
                "parent_category": 17,
                "image": "https://media.topachat.com/media/s200/62a899e962f3ec1ddc576e90.webp",
                "inverseparent_categoryNavigation": [],
                "products": []
            }
        ],
        "products": []
    },
    {
        "id": 18,
        "name": "RAM DDR3",
        "parent_category": 17,
        "image": "https://media.topachat.com/media/s200/619e3e912572885fae3024d0.webp",
        "parent_categoryNavigation": {
            "id": 17,
            "name": "RAM",
            "parent_category": 8,
            "image": "https://media.topachat.com/media/s200/619e4399a2cec2241f84f504.webp",
            "parent_categoryNavigation": {
                "id": 8,
                "name": "Composants",
                "inverseparent_categoryNavigation": [
                    {
                        "id": 9,
                        "name": "Refroidissements",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/619e3ffea2cec2241f84a25a.webp",
                        "inverseparent_categoryNavigation": [
                            {
                                "id": 10,
                                "name": "Ventirads",
                                "parent_category": 9,
                                "image": "https://media.topachat.com/media/s200/619e42d6a2cec2241f84e5a9.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 11,
                                "name": "Watercoolings",
                                "parent_category": 9,
                                "image": "https://media.topachat.com/media/s200/619e42232572885fae307ae0.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 12,
                                "name": "Ventilateurs",
                                "parent_category": 9,
                                "image": "https://media.topachat.com/media/s200/619e44ff2572885fae30c089.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            }
                        ],
                        "products": []
                    },
                    {
                        "id": 13,
                        "name": "Stockage",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/619e427fa2cec2241f84df58.webp",
                        "inverseparent_categoryNavigation": [
                            {
                                "id": 14,
                                "name": "Disques durs",
                                "parent_category": 13,
                                "image": "https://media.topachat.com/media/s200/63d281db3bf7f810d52d1910.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 15,
                                "name": "SSD sata",
                                "parent_category": 13,
                                "image": "https://media.topachat.com/media/s200/619e427fa2cec2241f84df58.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 16,
                                "name": "SSD NVME",
                                "parent_category": 13,
                                "image": "https://media.topachat.com/media/s200/63c8207dfa59406f2339afe7.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            }
                        ],
                        "products": []
                    },
                    {
                        "id": 21,
                        "name": "Cartes mères",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/634681b99a50ae7fa9118c27.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 22,
                        "name": "Cartes graphiques",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/63a195da2c6d90678a6b9f93.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 23,
                        "name": "Processeurs",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/668508d9fa318e0ab07457a2.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 24,
                        "name": "Alimentations",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/64102401c28a214e017b9454.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 25,
                        "name": "Pâtes thermiques",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/619e40c12572885fae304da6.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    }
                ],
                "products": []
            },
            "inverseparent_categoryNavigation": [
                {
                    "id": 19,
                    "name": "RAM DDR4",
                    "parent_category": 17,
                    "image": "https://media.topachat.com/media/s200/619e4012a2cec2241f84a48d.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 20,
                    "name": "RAM DDR5",
                    "parent_category": 17,
                    "image": "https://media.topachat.com/media/s200/62a899e962f3ec1ddc576e90.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                }
            ],
            "products": []
        },
        "inverseparent_categoryNavigation": [],
        "products": []
    },
    {
        "id": 19,
        "name": "RAM DDR4",
        "parent_category": 17,
        "image": "https://media.topachat.com/media/s200/619e4012a2cec2241f84a48d.webp",
        "parent_categoryNavigation": {
            "id": 17,
            "name": "RAM",
            "parent_category": 8,
            "image": "https://media.topachat.com/media/s200/619e4399a2cec2241f84f504.webp",
            "parent_categoryNavigation": {
                "id": 8,
                "name": "Composants",
                "inverseparent_categoryNavigation": [
                    {
                        "id": 9,
                        "name": "Refroidissements",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/619e3ffea2cec2241f84a25a.webp",
                        "inverseparent_categoryNavigation": [
                            {
                                "id": 10,
                                "name": "Ventirads",
                                "parent_category": 9,
                                "image": "https://media.topachat.com/media/s200/619e42d6a2cec2241f84e5a9.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 11,
                                "name": "Watercoolings",
                                "parent_category": 9,
                                "image": "https://media.topachat.com/media/s200/619e42232572885fae307ae0.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 12,
                                "name": "Ventilateurs",
                                "parent_category": 9,
                                "image": "https://media.topachat.com/media/s200/619e44ff2572885fae30c089.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            }
                        ],
                        "products": []
                    },
                    {
                        "id": 13,
                        "name": "Stockage",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/619e427fa2cec2241f84df58.webp",
                        "inverseparent_categoryNavigation": [
                            {
                                "id": 14,
                                "name": "Disques durs",
                                "parent_category": 13,
                                "image": "https://media.topachat.com/media/s200/63d281db3bf7f810d52d1910.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 15,
                                "name": "SSD sata",
                                "parent_category": 13,
                                "image": "https://media.topachat.com/media/s200/619e427fa2cec2241f84df58.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 16,
                                "name": "SSD NVME",
                                "parent_category": 13,
                                "image": "https://media.topachat.com/media/s200/63c8207dfa59406f2339afe7.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            }
                        ],
                        "products": []
                    },
                    {
                        "id": 21,
                        "name": "Cartes mères",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/634681b99a50ae7fa9118c27.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 22,
                        "name": "Cartes graphiques",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/63a195da2c6d90678a6b9f93.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 23,
                        "name": "Processeurs",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/668508d9fa318e0ab07457a2.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 24,
                        "name": "Alimentations",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/64102401c28a214e017b9454.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 25,
                        "name": "Pâtes thermiques",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/619e40c12572885fae304da6.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    }
                ],
                "products": []
            },
            "inverseparent_categoryNavigation": [
                {
                    "id": 18,
                    "name": "RAM DDR3",
                    "parent_category": 17,
                    "image": "https://media.topachat.com/media/s200/619e3e912572885fae3024d0.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 20,
                    "name": "RAM DDR5",
                    "parent_category": 17,
                    "image": "https://media.topachat.com/media/s200/62a899e962f3ec1ddc576e90.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                }
            ],
            "products": []
        },
        "inverseparent_categoryNavigation": [],
        "products": []
    },
    {
        "id": 20,
        "name": "RAM DDR5",
        "parent_category": 17,
        "image": "https://media.topachat.com/media/s200/62a899e962f3ec1ddc576e90.webp",
        "parent_categoryNavigation": {
            "id": 17,
            "name": "RAM",
            "parent_category": 8,
            "image": "https://media.topachat.com/media/s200/619e4399a2cec2241f84f504.webp",
            "parent_categoryNavigation": {
                "id": 8,
                "name": "Composants",
                "inverseparent_categoryNavigation": [
                    {
                        "id": 9,
                        "name": "Refroidissements",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/619e3ffea2cec2241f84a25a.webp",
                        "inverseparent_categoryNavigation": [
                            {
                                "id": 10,
                                "name": "Ventirads",
                                "parent_category": 9,
                                "image": "https://media.topachat.com/media/s200/619e42d6a2cec2241f84e5a9.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 11,
                                "name": "Watercoolings",
                                "parent_category": 9,
                                "image": "https://media.topachat.com/media/s200/619e42232572885fae307ae0.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 12,
                                "name": "Ventilateurs",
                                "parent_category": 9,
                                "image": "https://media.topachat.com/media/s200/619e44ff2572885fae30c089.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            }
                        ],
                        "products": []
                    },
                    {
                        "id": 13,
                        "name": "Stockage",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/619e427fa2cec2241f84df58.webp",
                        "inverseparent_categoryNavigation": [
                            {
                                "id": 14,
                                "name": "Disques durs",
                                "parent_category": 13,
                                "image": "https://media.topachat.com/media/s200/63d281db3bf7f810d52d1910.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 15,
                                "name": "SSD sata",
                                "parent_category": 13,
                                "image": "https://media.topachat.com/media/s200/619e427fa2cec2241f84df58.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 16,
                                "name": "SSD NVME",
                                "parent_category": 13,
                                "image": "https://media.topachat.com/media/s200/63c8207dfa59406f2339afe7.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            }
                        ],
                        "products": []
                    },
                    {
                        "id": 21,
                        "name": "Cartes mères",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/634681b99a50ae7fa9118c27.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 22,
                        "name": "Cartes graphiques",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/63a195da2c6d90678a6b9f93.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 23,
                        "name": "Processeurs",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/668508d9fa318e0ab07457a2.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 24,
                        "name": "Alimentations",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/64102401c28a214e017b9454.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 25,
                        "name": "Pâtes thermiques",
                        "parent_category": 8,
                        "image": "https://media.topachat.com/media/s200/619e40c12572885fae304da6.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    }
                ],
                "products": []
            },
            "inverseparent_categoryNavigation": [
                {
                    "id": 18,
                    "name": "RAM DDR3",
                    "parent_category": 17,
                    "image": "https://media.topachat.com/media/s200/619e3e912572885fae3024d0.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 19,
                    "name": "RAM DDR4",
                    "parent_category": 17,
                    "image": "https://media.topachat.com/media/s200/619e4012a2cec2241f84a48d.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                }
            ],
            "products": []
        },
        "inverseparent_categoryNavigation": [],
        "products": []
    },
    {
        "id": 21,
        "name": "Cartes mères",
        "parent_category": 8,
        "image": "https://media.topachat.com/media/s200/634681b99a50ae7fa9118c27.webp",
        "parent_categoryNavigation": {
            "id": 8,
            "name": "Composants",
            "inverseparent_categoryNavigation": [
                {
                    "id": 9,
                    "name": "Refroidissements",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/619e3ffea2cec2241f84a25a.webp",
                    "inverseparent_categoryNavigation": [
                        {
                            "id": 10,
                            "name": "Ventirads",
                            "parent_category": 9,
                            "image": "https://media.topachat.com/media/s200/619e42d6a2cec2241f84e5a9.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 11,
                            "name": "Watercoolings",
                            "parent_category": 9,
                            "image": "https://media.topachat.com/media/s200/619e42232572885fae307ae0.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 12,
                            "name": "Ventilateurs",
                            "parent_category": 9,
                            "image": "https://media.topachat.com/media/s200/619e44ff2572885fae30c089.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        }
                    ],
                    "products": []
                },
                {
                    "id": 13,
                    "name": "Stockage",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/619e427fa2cec2241f84df58.webp",
                    "inverseparent_categoryNavigation": [
                        {
                            "id": 14,
                            "name": "Disques durs",
                            "parent_category": 13,
                            "image": "https://media.topachat.com/media/s200/63d281db3bf7f810d52d1910.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 15,
                            "name": "SSD sata",
                            "parent_category": 13,
                            "image": "https://media.topachat.com/media/s200/619e427fa2cec2241f84df58.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 16,
                            "name": "SSD NVME",
                            "parent_category": 13,
                            "image": "https://media.topachat.com/media/s200/63c8207dfa59406f2339afe7.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        }
                    ],
                    "products": []
                },
                {
                    "id": 17,
                    "name": "RAM",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/619e4399a2cec2241f84f504.webp",
                    "inverseparent_categoryNavigation": [
                        {
                            "id": 18,
                            "name": "RAM DDR3",
                            "parent_category": 17,
                            "image": "https://media.topachat.com/media/s200/619e3e912572885fae3024d0.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 19,
                            "name": "RAM DDR4",
                            "parent_category": 17,
                            "image": "https://media.topachat.com/media/s200/619e4012a2cec2241f84a48d.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 20,
                            "name": "RAM DDR5",
                            "parent_category": 17,
                            "image": "https://media.topachat.com/media/s200/62a899e962f3ec1ddc576e90.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        }
                    ],
                    "products": []
                },
                {
                    "id": 22,
                    "name": "Cartes graphiques",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/63a195da2c6d90678a6b9f93.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 23,
                    "name": "Processeurs",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/668508d9fa318e0ab07457a2.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 24,
                    "name": "Alimentations",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/64102401c28a214e017b9454.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 25,
                    "name": "Pâtes thermiques",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/619e40c12572885fae304da6.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                }
            ],
            "products": []
        },
        "inverseparent_categoryNavigation": [],
        "products": []
    },
    {
        "id": 22,
        "name": "Cartes graphiques",
        "parent_category": 8,
        "image": "https://media.topachat.com/media/s200/63a195da2c6d90678a6b9f93.webp",
        "parent_categoryNavigation": {
            "id": 8,
            "name": "Composants",
            "inverseparent_categoryNavigation": [
                {
                    "id": 9,
                    "name": "Refroidissements",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/619e3ffea2cec2241f84a25a.webp",
                    "inverseparent_categoryNavigation": [
                        {
                            "id": 10,
                            "name": "Ventirads",
                            "parent_category": 9,
                            "image": "https://media.topachat.com/media/s200/619e42d6a2cec2241f84e5a9.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 11,
                            "name": "Watercoolings",
                            "parent_category": 9,
                            "image": "https://media.topachat.com/media/s200/619e42232572885fae307ae0.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 12,
                            "name": "Ventilateurs",
                            "parent_category": 9,
                            "image": "https://media.topachat.com/media/s200/619e44ff2572885fae30c089.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        }
                    ],
                    "products": []
                },
                {
                    "id": 13,
                    "name": "Stockage",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/619e427fa2cec2241f84df58.webp",
                    "inverseparent_categoryNavigation": [
                        {
                            "id": 14,
                            "name": "Disques durs",
                            "parent_category": 13,
                            "image": "https://media.topachat.com/media/s200/63d281db3bf7f810d52d1910.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 15,
                            "name": "SSD sata",
                            "parent_category": 13,
                            "image": "https://media.topachat.com/media/s200/619e427fa2cec2241f84df58.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 16,
                            "name": "SSD NVME",
                            "parent_category": 13,
                            "image": "https://media.topachat.com/media/s200/63c8207dfa59406f2339afe7.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        }
                    ],
                    "products": []
                },
                {
                    "id": 17,
                    "name": "RAM",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/619e4399a2cec2241f84f504.webp",
                    "inverseparent_categoryNavigation": [
                        {
                            "id": 18,
                            "name": "RAM DDR3",
                            "parent_category": 17,
                            "image": "https://media.topachat.com/media/s200/619e3e912572885fae3024d0.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 19,
                            "name": "RAM DDR4",
                            "parent_category": 17,
                            "image": "https://media.topachat.com/media/s200/619e4012a2cec2241f84a48d.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 20,
                            "name": "RAM DDR5",
                            "parent_category": 17,
                            "image": "https://media.topachat.com/media/s200/62a899e962f3ec1ddc576e90.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        }
                    ],
                    "products": []
                },
                {
                    "id": 21,
                    "name": "Cartes mères",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/634681b99a50ae7fa9118c27.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 23,
                    "name": "Processeurs",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/668508d9fa318e0ab07457a2.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 24,
                    "name": "Alimentations",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/64102401c28a214e017b9454.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 25,
                    "name": "Pâtes thermiques",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/619e40c12572885fae304da6.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                }
            ],
            "products": []
        },
        "inverseparent_categoryNavigation": [],
        "products": []
    },
    {
        "id": 23,
        "name": "Processeurs",
        "parent_category": 8,
        "image": "https://media.topachat.com/media/s200/668508d9fa318e0ab07457a2.webp",
        "parent_categoryNavigation": {
            "id": 8,
            "name": "Composants",
            "inverseparent_categoryNavigation": [
                {
                    "id": 9,
                    "name": "Refroidissements",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/619e3ffea2cec2241f84a25a.webp",
                    "inverseparent_categoryNavigation": [
                        {
                            "id": 10,
                            "name": "Ventirads",
                            "parent_category": 9,
                            "image": "https://media.topachat.com/media/s200/619e42d6a2cec2241f84e5a9.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 11,
                            "name": "Watercoolings",
                            "parent_category": 9,
                            "image": "https://media.topachat.com/media/s200/619e42232572885fae307ae0.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 12,
                            "name": "Ventilateurs",
                            "parent_category": 9,
                            "image": "https://media.topachat.com/media/s200/619e44ff2572885fae30c089.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        }
                    ],
                    "products": []
                },
                {
                    "id": 13,
                    "name": "Stockage",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/619e427fa2cec2241f84df58.webp",
                    "inverseparent_categoryNavigation": [
                        {
                            "id": 14,
                            "name": "Disques durs",
                            "parent_category": 13,
                            "image": "https://media.topachat.com/media/s200/63d281db3bf7f810d52d1910.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 15,
                            "name": "SSD sata",
                            "parent_category": 13,
                            "image": "https://media.topachat.com/media/s200/619e427fa2cec2241f84df58.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 16,
                            "name": "SSD NVME",
                            "parent_category": 13,
                            "image": "https://media.topachat.com/media/s200/63c8207dfa59406f2339afe7.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        }
                    ],
                    "products": []
                },
                {
                    "id": 17,
                    "name": "RAM",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/619e4399a2cec2241f84f504.webp",
                    "inverseparent_categoryNavigation": [
                        {
                            "id": 18,
                            "name": "RAM DDR3",
                            "parent_category": 17,
                            "image": "https://media.topachat.com/media/s200/619e3e912572885fae3024d0.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 19,
                            "name": "RAM DDR4",
                            "parent_category": 17,
                            "image": "https://media.topachat.com/media/s200/619e4012a2cec2241f84a48d.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 20,
                            "name": "RAM DDR5",
                            "parent_category": 17,
                            "image": "https://media.topachat.com/media/s200/62a899e962f3ec1ddc576e90.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        }
                    ],
                    "products": []
                },
                {
                    "id": 21,
                    "name": "Cartes mères",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/634681b99a50ae7fa9118c27.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 22,
                    "name": "Cartes graphiques",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/63a195da2c6d90678a6b9f93.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 24,
                    "name": "Alimentations",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/64102401c28a214e017b9454.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 25,
                    "name": "Pâtes thermiques",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/619e40c12572885fae304da6.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                }
            ],
            "products": []
        },
        "inverseparent_categoryNavigation": [],
        "products": []
    },
    {
        "id": 24,
        "name": "Alimentations",
        "parent_category": 8,
        "image": "https://media.topachat.com/media/s200/64102401c28a214e017b9454.webp",
        "parent_categoryNavigation": {
            "id": 8,
            "name": "Composants",
            "inverseparent_categoryNavigation": [
                {
                    "id": 9,
                    "name": "Refroidissements",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/619e3ffea2cec2241f84a25a.webp",
                    "inverseparent_categoryNavigation": [
                        {
                            "id": 10,
                            "name": "Ventirads",
                            "parent_category": 9,
                            "image": "https://media.topachat.com/media/s200/619e42d6a2cec2241f84e5a9.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 11,
                            "name": "Watercoolings",
                            "parent_category": 9,
                            "image": "https://media.topachat.com/media/s200/619e42232572885fae307ae0.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 12,
                            "name": "Ventilateurs",
                            "parent_category": 9,
                            "image": "https://media.topachat.com/media/s200/619e44ff2572885fae30c089.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        }
                    ],
                    "products": []
                },
                {
                    "id": 13,
                    "name": "Stockage",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/619e427fa2cec2241f84df58.webp",
                    "inverseparent_categoryNavigation": [
                        {
                            "id": 14,
                            "name": "Disques durs",
                            "parent_category": 13,
                            "image": "https://media.topachat.com/media/s200/63d281db3bf7f810d52d1910.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 15,
                            "name": "SSD sata",
                            "parent_category": 13,
                            "image": "https://media.topachat.com/media/s200/619e427fa2cec2241f84df58.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 16,
                            "name": "SSD NVME",
                            "parent_category": 13,
                            "image": "https://media.topachat.com/media/s200/63c8207dfa59406f2339afe7.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        }
                    ],
                    "products": []
                },
                {
                    "id": 17,
                    "name": "RAM",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/619e4399a2cec2241f84f504.webp",
                    "inverseparent_categoryNavigation": [
                        {
                            "id": 18,
                            "name": "RAM DDR3",
                            "parent_category": 17,
                            "image": "https://media.topachat.com/media/s200/619e3e912572885fae3024d0.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 19,
                            "name": "RAM DDR4",
                            "parent_category": 17,
                            "image": "https://media.topachat.com/media/s200/619e4012a2cec2241f84a48d.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 20,
                            "name": "RAM DDR5",
                            "parent_category": 17,
                            "image": "https://media.topachat.com/media/s200/62a899e962f3ec1ddc576e90.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        }
                    ],
                    "products": []
                },
                {
                    "id": 21,
                    "name": "Cartes mères",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/634681b99a50ae7fa9118c27.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 22,
                    "name": "Cartes graphiques",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/63a195da2c6d90678a6b9f93.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 23,
                    "name": "Processeurs",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/668508d9fa318e0ab07457a2.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 25,
                    "name": "Pâtes thermiques",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/619e40c12572885fae304da6.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                }
            ],
            "products": []
        },
        "inverseparent_categoryNavigation": [],
        "products": []
    },
    {
        "id": 25,
        "name": "Pâtes thermiques",
        "parent_category": 8,
        "image": "https://media.topachat.com/media/s200/619e40c12572885fae304da6.webp",
        "parent_categoryNavigation": {
            "id": 8,
            "name": "Composants",
            "inverseparent_categoryNavigation": [
                {
                    "id": 9,
                    "name": "Refroidissements",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/619e3ffea2cec2241f84a25a.webp",
                    "inverseparent_categoryNavigation": [
                        {
                            "id": 10,
                            "name": "Ventirads",
                            "parent_category": 9,
                            "image": "https://media.topachat.com/media/s200/619e42d6a2cec2241f84e5a9.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 11,
                            "name": "Watercoolings",
                            "parent_category": 9,
                            "image": "https://media.topachat.com/media/s200/619e42232572885fae307ae0.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 12,
                            "name": "Ventilateurs",
                            "parent_category": 9,
                            "image": "https://media.topachat.com/media/s200/619e44ff2572885fae30c089.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        }
                    ],
                    "products": []
                },
                {
                    "id": 13,
                    "name": "Stockage",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/619e427fa2cec2241f84df58.webp",
                    "inverseparent_categoryNavigation": [
                        {
                            "id": 14,
                            "name": "Disques durs",
                            "parent_category": 13,
                            "image": "https://media.topachat.com/media/s200/63d281db3bf7f810d52d1910.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 15,
                            "name": "SSD sata",
                            "parent_category": 13,
                            "image": "https://media.topachat.com/media/s200/619e427fa2cec2241f84df58.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 16,
                            "name": "SSD NVME",
                            "parent_category": 13,
                            "image": "https://media.topachat.com/media/s200/63c8207dfa59406f2339afe7.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        }
                    ],
                    "products": []
                },
                {
                    "id": 17,
                    "name": "RAM",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/619e4399a2cec2241f84f504.webp",
                    "inverseparent_categoryNavigation": [
                        {
                            "id": 18,
                            "name": "RAM DDR3",
                            "parent_category": 17,
                            "image": "https://media.topachat.com/media/s200/619e3e912572885fae3024d0.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 19,
                            "name": "RAM DDR4",
                            "parent_category": 17,
                            "image": "https://media.topachat.com/media/s200/619e4012a2cec2241f84a48d.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 20,
                            "name": "RAM DDR5",
                            "parent_category": 17,
                            "image": "https://media.topachat.com/media/s200/62a899e962f3ec1ddc576e90.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        }
                    ],
                    "products": []
                },
                {
                    "id": 21,
                    "name": "Cartes mères",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/634681b99a50ae7fa9118c27.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 22,
                    "name": "Cartes graphiques",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/63a195da2c6d90678a6b9f93.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 23,
                    "name": "Processeurs",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/668508d9fa318e0ab07457a2.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 24,
                    "name": "Alimentations",
                    "parent_category": 8,
                    "image": "https://media.topachat.com/media/s200/64102401c28a214e017b9454.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                }
            ],
            "products": []
        },
        "inverseparent_categoryNavigation": [],
        "products": []
    },
    {
        "id": 26,
        "name": "Périphériques",
        "inverseparent_categoryNavigation": [
            {
                "id": 27,
                "name": "Périphériques gaming",
                "parent_category": 26,
                "inverseparent_categoryNavigation": [
                    {
                        "id": 28,
                        "name": "Souris gaming",
                        "parent_category": 27,
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 29,
                        "name": "Claviers gaming",
                        "parent_category": 27,
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 30,
                        "name": "Casques gaming",
                        "parent_category": 27,
                        "image": "https://media.topachat.com/media/s200/646b5aeeae3ece37940a6c93.webp",
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 31,
                        "name": "Tapis gaming",
                        "parent_category": 27,
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    }
                ],
                "products": []
            },
            {
                "id": 32,
                "name": "Périphériques bureautiques",
                "parent_category": 26,
                "inverseparent_categoryNavigation": [
                    {
                        "id": 33,
                        "name": "Souris bureautiques",
                        "parent_category": 32,
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 34,
                        "name": "Claviers bureautiques",
                        "parent_category": 32,
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 35,
                        "name": "Casques bureautiques",
                        "parent_category": 32,
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 36,
                        "name": "Tapis bureautiques",
                        "parent_category": 32,
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    }
                ],
                "products": []
            },
            {
                "id": 37,
                "name": "Webcam",
                "parent_category": 26,
                "inverseparent_categoryNavigation": [],
                "products": []
            },
            {
                "id": 38,
                "name": "Ecrans",
                "parent_category": 26,
                "inverseparent_categoryNavigation": [],
                "products": []
            },
            {
                "id": 39,
                "name": "Enceintes",
                "parent_category": 26,
                "inverseparent_categoryNavigation": [],
                "products": []
            }
        ],
        "products": []
    },
    {
        "id": 27,
        "name": "Périphériques gaming",
        "parent_category": 26,
        "parent_categoryNavigation": {
            "id": 26,
            "name": "Périphériques",
            "inverseparent_categoryNavigation": [
                {
                    "id": 32,
                    "name": "Périphériques bureautiques",
                    "parent_category": 26,
                    "inverseparent_categoryNavigation": [
                        {
                            "id": 33,
                            "name": "Souris bureautiques",
                            "parent_category": 32,
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 34,
                            "name": "Claviers bureautiques",
                            "parent_category": 32,
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 35,
                            "name": "Casques bureautiques",
                            "parent_category": 32,
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 36,
                            "name": "Tapis bureautiques",
                            "parent_category": 32,
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        }
                    ],
                    "products": []
                },
                {
                    "id": 37,
                    "name": "Webcam",
                    "parent_category": 26,
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 38,
                    "name": "Ecrans",
                    "parent_category": 26,
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 39,
                    "name": "Enceintes",
                    "parent_category": 26,
                    "inverseparent_categoryNavigation": [],
                    "products": []
                }
            ],
            "products": []
        },
        "inverseparent_categoryNavigation": [
            {
                "id": 28,
                "name": "Souris gaming",
                "parent_category": 27,
                "inverseparent_categoryNavigation": [],
                "products": []
            },
            {
                "id": 29,
                "name": "Claviers gaming",
                "parent_category": 27,
                "inverseparent_categoryNavigation": [],
                "products": []
            },
            {
                "id": 30,
                "name": "Casques gaming",
                "parent_category": 27,
                "image": "https://media.topachat.com/media/s200/646b5aeeae3ece37940a6c93.webp",
                "inverseparent_categoryNavigation": [],
                "products": []
            },
            {
                "id": 31,
                "name": "Tapis gaming",
                "parent_category": 27,
                "inverseparent_categoryNavigation": [],
                "products": []
            }
        ],
        "products": []
    },
    {
        "id": 28,
        "name": "Souris gaming",
        "parent_category": 27,
        "parent_categoryNavigation": {
            "id": 27,
            "name": "Périphériques gaming",
            "parent_category": 26,
            "parent_categoryNavigation": {
                "id": 26,
                "name": "Périphériques",
                "inverseparent_categoryNavigation": [
                    {
                        "id": 32,
                        "name": "Périphériques bureautiques",
                        "parent_category": 26,
                        "inverseparent_categoryNavigation": [
                            {
                                "id": 33,
                                "name": "Souris bureautiques",
                                "parent_category": 32,
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 34,
                                "name": "Claviers bureautiques",
                                "parent_category": 32,
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 35,
                                "name": "Casques bureautiques",
                                "parent_category": 32,
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 36,
                                "name": "Tapis bureautiques",
                                "parent_category": 32,
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            }
                        ],
                        "products": []
                    },
                    {
                        "id": 37,
                        "name": "Webcam",
                        "parent_category": 26,
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 38,
                        "name": "Ecrans",
                        "parent_category": 26,
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 39,
                        "name": "Enceintes",
                        "parent_category": 26,
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    }
                ],
                "products": []
            },
            "inverseparent_categoryNavigation": [
                {
                    "id": 29,
                    "name": "Claviers gaming",
                    "parent_category": 27,
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 30,
                    "name": "Casques gaming",
                    "parent_category": 27,
                    "image": "https://media.topachat.com/media/s200/646b5aeeae3ece37940a6c93.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 31,
                    "name": "Tapis gaming",
                    "parent_category": 27,
                    "inverseparent_categoryNavigation": [],
                    "products": []
                }
            ],
            "products": []
        },
        "inverseparent_categoryNavigation": [],
        "products": []
    },
    {
        "id": 29,
        "name": "Claviers gaming",
        "parent_category": 27,
        "parent_categoryNavigation": {
            "id": 27,
            "name": "Périphériques gaming",
            "parent_category": 26,
            "parent_categoryNavigation": {
                "id": 26,
                "name": "Périphériques",
                "inverseparent_categoryNavigation": [
                    {
                        "id": 32,
                        "name": "Périphériques bureautiques",
                        "parent_category": 26,
                        "inverseparent_categoryNavigation": [
                            {
                                "id": 33,
                                "name": "Souris bureautiques",
                                "parent_category": 32,
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 34,
                                "name": "Claviers bureautiques",
                                "parent_category": 32,
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 35,
                                "name": "Casques bureautiques",
                                "parent_category": 32,
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 36,
                                "name": "Tapis bureautiques",
                                "parent_category": 32,
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            }
                        ],
                        "products": []
                    },
                    {
                        "id": 37,
                        "name": "Webcam",
                        "parent_category": 26,
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 38,
                        "name": "Ecrans",
                        "parent_category": 26,
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 39,
                        "name": "Enceintes",
                        "parent_category": 26,
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    }
                ],
                "products": []
            },
            "inverseparent_categoryNavigation": [
                {
                    "id": 28,
                    "name": "Souris gaming",
                    "parent_category": 27,
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 30,
                    "name": "Casques gaming",
                    "parent_category": 27,
                    "image": "https://media.topachat.com/media/s200/646b5aeeae3ece37940a6c93.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 31,
                    "name": "Tapis gaming",
                    "parent_category": 27,
                    "inverseparent_categoryNavigation": [],
                    "products": []
                }
            ],
            "products": []
        },
        "inverseparent_categoryNavigation": [],
        "products": []
    },
    {
        "id": 30,
        "name": "Casques gaming",
        "parent_category": 27,
        "image": "https://media.topachat.com/media/s200/646b5aeeae3ece37940a6c93.webp",
        "parent_categoryNavigation": {
            "id": 27,
            "name": "Périphériques gaming",
            "parent_category": 26,
            "parent_categoryNavigation": {
                "id": 26,
                "name": "Périphériques",
                "inverseparent_categoryNavigation": [
                    {
                        "id": 32,
                        "name": "Périphériques bureautiques",
                        "parent_category": 26,
                        "inverseparent_categoryNavigation": [
                            {
                                "id": 33,
                                "name": "Souris bureautiques",
                                "parent_category": 32,
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 34,
                                "name": "Claviers bureautiques",
                                "parent_category": 32,
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 35,
                                "name": "Casques bureautiques",
                                "parent_category": 32,
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 36,
                                "name": "Tapis bureautiques",
                                "parent_category": 32,
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            }
                        ],
                        "products": []
                    },
                    {
                        "id": 37,
                        "name": "Webcam",
                        "parent_category": 26,
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 38,
                        "name": "Ecrans",
                        "parent_category": 26,
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 39,
                        "name": "Enceintes",
                        "parent_category": 26,
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    }
                ],
                "products": []
            },
            "inverseparent_categoryNavigation": [
                {
                    "id": 28,
                    "name": "Souris gaming",
                    "parent_category": 27,
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 29,
                    "name": "Claviers gaming",
                    "parent_category": 27,
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 31,
                    "name": "Tapis gaming",
                    "parent_category": 27,
                    "inverseparent_categoryNavigation": [],
                    "products": []
                }
            ],
            "products": []
        },
        "inverseparent_categoryNavigation": [],
        "products": []
    },
    {
        "id": 31,
        "name": "Tapis gaming",
        "parent_category": 27,
        "parent_categoryNavigation": {
            "id": 27,
            "name": "Périphériques gaming",
            "parent_category": 26,
            "parent_categoryNavigation": {
                "id": 26,
                "name": "Périphériques",
                "inverseparent_categoryNavigation": [
                    {
                        "id": 32,
                        "name": "Périphériques bureautiques",
                        "parent_category": 26,
                        "inverseparent_categoryNavigation": [
                            {
                                "id": 33,
                                "name": "Souris bureautiques",
                                "parent_category": 32,
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 34,
                                "name": "Claviers bureautiques",
                                "parent_category": 32,
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 35,
                                "name": "Casques bureautiques",
                                "parent_category": 32,
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 36,
                                "name": "Tapis bureautiques",
                                "parent_category": 32,
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            }
                        ],
                        "products": []
                    },
                    {
                        "id": 37,
                        "name": "Webcam",
                        "parent_category": 26,
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 38,
                        "name": "Ecrans",
                        "parent_category": 26,
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 39,
                        "name": "Enceintes",
                        "parent_category": 26,
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    }
                ],
                "products": []
            },
            "inverseparent_categoryNavigation": [
                {
                    "id": 28,
                    "name": "Souris gaming",
                    "parent_category": 27,
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 29,
                    "name": "Claviers gaming",
                    "parent_category": 27,
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 30,
                    "name": "Casques gaming",
                    "parent_category": 27,
                    "image": "https://media.topachat.com/media/s200/646b5aeeae3ece37940a6c93.webp",
                    "inverseparent_categoryNavigation": [],
                    "products": []
                }
            ],
            "products": []
        },
        "inverseparent_categoryNavigation": [],
        "products": []
    },
    {
        "id": 32,
        "name": "Périphériques bureautiques",
        "parent_category": 26,
        "parent_categoryNavigation": {
            "id": 26,
            "name": "Périphériques",
            "inverseparent_categoryNavigation": [
                {
                    "id": 27,
                    "name": "Périphériques gaming",
                    "parent_category": 26,
                    "inverseparent_categoryNavigation": [
                        {
                            "id": 28,
                            "name": "Souris gaming",
                            "parent_category": 27,
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 29,
                            "name": "Claviers gaming",
                            "parent_category": 27,
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 30,
                            "name": "Casques gaming",
                            "parent_category": 27,
                            "image": "https://media.topachat.com/media/s200/646b5aeeae3ece37940a6c93.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 31,
                            "name": "Tapis gaming",
                            "parent_category": 27,
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        }
                    ],
                    "products": []
                },
                {
                    "id": 37,
                    "name": "Webcam",
                    "parent_category": 26,
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 38,
                    "name": "Ecrans",
                    "parent_category": 26,
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 39,
                    "name": "Enceintes",
                    "parent_category": 26,
                    "inverseparent_categoryNavigation": [],
                    "products": []
                }
            ],
            "products": []
        },
        "inverseparent_categoryNavigation": [
            {
                "id": 33,
                "name": "Souris bureautiques",
                "parent_category": 32,
                "inverseparent_categoryNavigation": [],
                "products": []
            },
            {
                "id": 34,
                "name": "Claviers bureautiques",
                "parent_category": 32,
                "inverseparent_categoryNavigation": [],
                "products": []
            },
            {
                "id": 35,
                "name": "Casques bureautiques",
                "parent_category": 32,
                "inverseparent_categoryNavigation": [],
                "products": []
            },
            {
                "id": 36,
                "name": "Tapis bureautiques",
                "parent_category": 32,
                "inverseparent_categoryNavigation": [],
                "products": []
            }
        ],
        "products": []
    },
    {
        "id": 33,
        "name": "Souris bureautiques",
        "parent_category": 32,
        "parent_categoryNavigation": {
            "id": 32,
            "name": "Périphériques bureautiques",
            "parent_category": 26,
            "parent_categoryNavigation": {
                "id": 26,
                "name": "Périphériques",
                "inverseparent_categoryNavigation": [
                    {
                        "id": 27,
                        "name": "Périphériques gaming",
                        "parent_category": 26,
                        "inverseparent_categoryNavigation": [
                            {
                                "id": 28,
                                "name": "Souris gaming",
                                "parent_category": 27,
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 29,
                                "name": "Claviers gaming",
                                "parent_category": 27,
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 30,
                                "name": "Casques gaming",
                                "parent_category": 27,
                                "image": "https://media.topachat.com/media/s200/646b5aeeae3ece37940a6c93.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 31,
                                "name": "Tapis gaming",
                                "parent_category": 27,
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            }
                        ],
                        "products": []
                    },
                    {
                        "id": 37,
                        "name": "Webcam",
                        "parent_category": 26,
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 38,
                        "name": "Ecrans",
                        "parent_category": 26,
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 39,
                        "name": "Enceintes",
                        "parent_category": 26,
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    }
                ],
                "products": []
            },
            "inverseparent_categoryNavigation": [
                {
                    "id": 34,
                    "name": "Claviers bureautiques",
                    "parent_category": 32,
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 35,
                    "name": "Casques bureautiques",
                    "parent_category": 32,
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 36,
                    "name": "Tapis bureautiques",
                    "parent_category": 32,
                    "inverseparent_categoryNavigation": [],
                    "products": []
                }
            ],
            "products": []
        },
        "inverseparent_categoryNavigation": [],
        "products": []
    },
    {
        "id": 34,
        "name": "Claviers bureautiques",
        "parent_category": 32,
        "parent_categoryNavigation": {
            "id": 32,
            "name": "Périphériques bureautiques",
            "parent_category": 26,
            "parent_categoryNavigation": {
                "id": 26,
                "name": "Périphériques",
                "inverseparent_categoryNavigation": [
                    {
                        "id": 27,
                        "name": "Périphériques gaming",
                        "parent_category": 26,
                        "inverseparent_categoryNavigation": [
                            {
                                "id": 28,
                                "name": "Souris gaming",
                                "parent_category": 27,
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 29,
                                "name": "Claviers gaming",
                                "parent_category": 27,
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 30,
                                "name": "Casques gaming",
                                "parent_category": 27,
                                "image": "https://media.topachat.com/media/s200/646b5aeeae3ece37940a6c93.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 31,
                                "name": "Tapis gaming",
                                "parent_category": 27,
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            }
                        ],
                        "products": []
                    },
                    {
                        "id": 37,
                        "name": "Webcam",
                        "parent_category": 26,
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 38,
                        "name": "Ecrans",
                        "parent_category": 26,
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 39,
                        "name": "Enceintes",
                        "parent_category": 26,
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    }
                ],
                "products": []
            },
            "inverseparent_categoryNavigation": [
                {
                    "id": 33,
                    "name": "Souris bureautiques",
                    "parent_category": 32,
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 35,
                    "name": "Casques bureautiques",
                    "parent_category": 32,
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 36,
                    "name": "Tapis bureautiques",
                    "parent_category": 32,
                    "inverseparent_categoryNavigation": [],
                    "products": []
                }
            ],
            "products": []
        },
        "inverseparent_categoryNavigation": [],
        "products": []
    },
    {
        "id": 35,
        "name": "Casques bureautiques",
        "parent_category": 32,
        "parent_categoryNavigation": {
            "id": 32,
            "name": "Périphériques bureautiques",
            "parent_category": 26,
            "parent_categoryNavigation": {
                "id": 26,
                "name": "Périphériques",
                "inverseparent_categoryNavigation": [
                    {
                        "id": 27,
                        "name": "Périphériques gaming",
                        "parent_category": 26,
                        "inverseparent_categoryNavigation": [
                            {
                                "id": 28,
                                "name": "Souris gaming",
                                "parent_category": 27,
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 29,
                                "name": "Claviers gaming",
                                "parent_category": 27,
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 30,
                                "name": "Casques gaming",
                                "parent_category": 27,
                                "image": "https://media.topachat.com/media/s200/646b5aeeae3ece37940a6c93.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 31,
                                "name": "Tapis gaming",
                                "parent_category": 27,
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            }
                        ],
                        "products": []
                    },
                    {
                        "id": 37,
                        "name": "Webcam",
                        "parent_category": 26,
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 38,
                        "name": "Ecrans",
                        "parent_category": 26,
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 39,
                        "name": "Enceintes",
                        "parent_category": 26,
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    }
                ],
                "products": []
            },
            "inverseparent_categoryNavigation": [
                {
                    "id": 33,
                    "name": "Souris bureautiques",
                    "parent_category": 32,
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 34,
                    "name": "Claviers bureautiques",
                    "parent_category": 32,
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 36,
                    "name": "Tapis bureautiques",
                    "parent_category": 32,
                    "inverseparent_categoryNavigation": [],
                    "products": []
                }
            ],
            "products": []
        },
        "inverseparent_categoryNavigation": [],
        "products": []
    },
    {
        "id": 36,
        "name": "Tapis bureautiques",
        "parent_category": 32,
        "parent_categoryNavigation": {
            "id": 32,
            "name": "Périphériques bureautiques",
            "parent_category": 26,
            "parent_categoryNavigation": {
                "id": 26,
                "name": "Périphériques",
                "inverseparent_categoryNavigation": [
                    {
                        "id": 27,
                        "name": "Périphériques gaming",
                        "parent_category": 26,
                        "inverseparent_categoryNavigation": [
                            {
                                "id": 28,
                                "name": "Souris gaming",
                                "parent_category": 27,
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 29,
                                "name": "Claviers gaming",
                                "parent_category": 27,
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 30,
                                "name": "Casques gaming",
                                "parent_category": 27,
                                "image": "https://media.topachat.com/media/s200/646b5aeeae3ece37940a6c93.webp",
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            },
                            {
                                "id": 31,
                                "name": "Tapis gaming",
                                "parent_category": 27,
                                "inverseparent_categoryNavigation": [],
                                "products": []
                            }
                        ],
                        "products": []
                    },
                    {
                        "id": 37,
                        "name": "Webcam",
                        "parent_category": 26,
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 38,
                        "name": "Ecrans",
                        "parent_category": 26,
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    },
                    {
                        "id": 39,
                        "name": "Enceintes",
                        "parent_category": 26,
                        "inverseparent_categoryNavigation": [],
                        "products": []
                    }
                ],
                "products": []
            },
            "inverseparent_categoryNavigation": [
                {
                    "id": 33,
                    "name": "Souris bureautiques",
                    "parent_category": 32,
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 34,
                    "name": "Claviers bureautiques",
                    "parent_category": 32,
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 35,
                    "name": "Casques bureautiques",
                    "parent_category": 32,
                    "inverseparent_categoryNavigation": [],
                    "products": []
                }
            ],
            "products": []
        },
        "inverseparent_categoryNavigation": [],
        "products": []
    },
    {
        "id": 37,
        "name": "Webcam",
        "parent_category": 26,
        "parent_categoryNavigation": {
            "id": 26,
            "name": "Périphériques",
            "inverseparent_categoryNavigation": [
                {
                    "id": 27,
                    "name": "Périphériques gaming",
                    "parent_category": 26,
                    "inverseparent_categoryNavigation": [
                        {
                            "id": 28,
                            "name": "Souris gaming",
                            "parent_category": 27,
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 29,
                            "name": "Claviers gaming",
                            "parent_category": 27,
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 30,
                            "name": "Casques gaming",
                            "parent_category": 27,
                            "image": "https://media.topachat.com/media/s200/646b5aeeae3ece37940a6c93.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 31,
                            "name": "Tapis gaming",
                            "parent_category": 27,
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        }
                    ],
                    "products": []
                },
                {
                    "id": 32,
                    "name": "Périphériques bureautiques",
                    "parent_category": 26,
                    "inverseparent_categoryNavigation": [
                        {
                            "id": 33,
                            "name": "Souris bureautiques",
                            "parent_category": 32,
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 34,
                            "name": "Claviers bureautiques",
                            "parent_category": 32,
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 35,
                            "name": "Casques bureautiques",
                            "parent_category": 32,
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 36,
                            "name": "Tapis bureautiques",
                            "parent_category": 32,
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        }
                    ],
                    "products": []
                },
                {
                    "id": 38,
                    "name": "Ecrans",
                    "parent_category": 26,
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 39,
                    "name": "Enceintes",
                    "parent_category": 26,
                    "inverseparent_categoryNavigation": [],
                    "products": []
                }
            ],
            "products": []
        },
        "inverseparent_categoryNavigation": [],
        "products": []
    },
    {
        "id": 38,
        "name": "Ecrans",
        "parent_category": 26,
        "parent_categoryNavigation": {
            "id": 26,
            "name": "Périphériques",
            "inverseparent_categoryNavigation": [
                {
                    "id": 27,
                    "name": "Périphériques gaming",
                    "parent_category": 26,
                    "inverseparent_categoryNavigation": [
                        {
                            "id": 28,
                            "name": "Souris gaming",
                            "parent_category": 27,
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 29,
                            "name": "Claviers gaming",
                            "parent_category": 27,
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 30,
                            "name": "Casques gaming",
                            "parent_category": 27,
                            "image": "https://media.topachat.com/media/s200/646b5aeeae3ece37940a6c93.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 31,
                            "name": "Tapis gaming",
                            "parent_category": 27,
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        }
                    ],
                    "products": []
                },
                {
                    "id": 32,
                    "name": "Périphériques bureautiques",
                    "parent_category": 26,
                    "inverseparent_categoryNavigation": [
                        {
                            "id": 33,
                            "name": "Souris bureautiques",
                            "parent_category": 32,
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 34,
                            "name": "Claviers bureautiques",
                            "parent_category": 32,
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 35,
                            "name": "Casques bureautiques",
                            "parent_category": 32,
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 36,
                            "name": "Tapis bureautiques",
                            "parent_category": 32,
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        }
                    ],
                    "products": []
                },
                {
                    "id": 37,
                    "name": "Webcam",
                    "parent_category": 26,
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 39,
                    "name": "Enceintes",
                    "parent_category": 26,
                    "inverseparent_categoryNavigation": [],
                    "products": []
                }
            ],
            "products": []
        },
        "inverseparent_categoryNavigation": [],
        "products": []
    },
    {
        "id": 39,
        "name": "Enceintes",
        "parent_category": 26,
        "parent_categoryNavigation": {
            "id": 26,
            "name": "Périphériques",
            "inverseparent_categoryNavigation": [
                {
                    "id": 27,
                    "name": "Périphériques gaming",
                    "parent_category": 26,
                    "inverseparent_categoryNavigation": [
                        {
                            "id": 28,
                            "name": "Souris gaming",
                            "parent_category": 27,
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 29,
                            "name": "Claviers gaming",
                            "parent_category": 27,
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 30,
                            "name": "Casques gaming",
                            "parent_category": 27,
                            "image": "https://media.topachat.com/media/s200/646b5aeeae3ece37940a6c93.webp",
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 31,
                            "name": "Tapis gaming",
                            "parent_category": 27,
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        }
                    ],
                    "products": []
                },
                {
                    "id": 32,
                    "name": "Périphériques bureautiques",
                    "parent_category": 26,
                    "inverseparent_categoryNavigation": [
                        {
                            "id": 33,
                            "name": "Souris bureautiques",
                            "parent_category": 32,
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 34,
                            "name": "Claviers bureautiques",
                            "parent_category": 32,
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 35,
                            "name": "Casques bureautiques",
                            "parent_category": 32,
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        },
                        {
                            "id": 36,
                            "name": "Tapis bureautiques",
                            "parent_category": 32,
                            "inverseparent_categoryNavigation": [],
                            "products": []
                        }
                    ],
                    "products": []
                },
                {
                    "id": 37,
                    "name": "Webcam",
                    "parent_category": 26,
                    "inverseparent_categoryNavigation": [],
                    "products": []
                },
                {
                    "id": 38,
                    "name": "Ecrans",
                    "parent_category": 26,
                    "inverseparent_categoryNavigation": [],
                    "products": []
                }
            ],
            "products": []
        },
        "inverseparent_categoryNavigation": [],
        "products": []
    }
]