export const terrafomContent = `terraform {{
    required_providers {{
        aws = {{
            source = "hashicorp/aws"
            version = "5.45.0"
        }}
    }}
}}

provider "aws" {{
    region = "ap-south-1"
}}

resource "aws_security_group" "sg" {{    
    ingress {{
        from_port   = 80
        to_port     = 80
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }}
    
    ingress {{
        from_port   = 443
        to_port     = 443
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }}
    ingress {{
        from_port   = 22
        to_port     = 22
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }}
    
    egress {{
        from_port   = 0
        to_port     = 0
        protocol    = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }}
}}

resource "aws_instance" "ec2" {{
    ami           = "ami-007020fd9c84e18c7"
    instance_type = "t2.micro"
    tags = {{
        Name = var.instance_name
    }}
    vpc_security_group_ids = [ aws_security_group.sg.id ]
    associate_public_ip_address = true

}}
`;