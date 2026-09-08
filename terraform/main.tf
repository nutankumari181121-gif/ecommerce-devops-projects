provider "aws" {
  region = "eu-north-1"
}

resource "aws_s3_bucket" "terraform_demo" {
  bucket = "ecommerce-devops-terraform-demo-876875539860"

  tags = {
    Name        = "Terraform Demo"
    Environment = "Dev"
    Project     = "Ecommerce-DevOps"
  }
}